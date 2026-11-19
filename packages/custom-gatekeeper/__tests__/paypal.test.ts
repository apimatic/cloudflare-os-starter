import { env, runInDurableObject } from "cloudflare:test";
import { RpcStub, RpcTarget } from "cloudflare:workers";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CustomGatekeeper, describeCustomAccount, describeCustomVendor } from "../src/custom.js";
import { ActionStore } from "../src/paypal-actions.js";
import { payPalClient, setPayPalTransportForTesting } from "../src/paypal-client.js";
import { PAYPAL_ACTION_KIND, PayPalSessionImpl } from "../src/paypal-session.js";
import TYPES_CODE from "../src/types-code.js";

const SANDBOX = "https://api-m.sandbox.paypal.com";

type Sent = { method: string; url: string; headers: Headers; body: unknown };

/** A fake PayPal: answers the token endpoint and whatever `routes` maps "METHOD /path" to. */
function fakePayPal(routes: Record<string, (body: unknown) => { status: number; body?: unknown }>) {
  const sent: Sent[] = [];
  const transport = async (input: Request | string | URL, init?: RequestInit): Promise<Response> => {
    const request = new Request(input, init);
    const url = new URL(request.url);
    if (url.pathname === "/v1/oauth2/token") {
      return Response.json({ access_token: "test-token", token_type: "Bearer", expires_in: 3600 });
    }
    const text = await request.text();
    const body = text ? JSON.parse(text) : undefined;
    sent.push({ method: request.method, url: request.url, headers: request.headers, body });
    const route = routes[`${request.method} ${url.pathname}`];
    if (!route) return Response.json({ name: "RESOURCE_NOT_FOUND", message: "no route" }, { status: 404 });
    const answer = route(body);
    return answer.body === undefined
      ? new Response(null, { status: answer.status })
      : Response.json(answer.body, { status: answer.status });
  };
  return { sent, transport };
}

type Observation = { title: string; description: string };

/** A stand-in for the Workshop's approval queue; `onSubmit` plays the decision. */
function fakeQueue(onSubmit: (id: number) => void = () => {}) {
  const observations: Observation[] = [];
  const submitted: Array<{ id: number; description: any }> = [];
  const queue = {
    async authorizeObservation(o: Observation) { observations.push(o); },
    async submitAction(id: number, description: unknown) {
      submitted.push({ id, description });
      // The Workshop applies an auto-approved action only after submitAction() returns.
      setTimeout(() => onSubmit(id), 0);
    },
    dup() { return queue; },
  };
  return { queue, observations, submitted };
}

const AUTHORIZED_ORDER = {
  id: "ORDER1",
  status: "COMPLETED",
  intent: "AUTHORIZE",
  purchase_units: [{
    reference_id: "default",
    payments: {
      authorizations: [{
        id: "AUTH1",
        status: "CREATED",
        amount: { currency_code: "USD", value: "19.99" },
        expiration_time: "2026-12-18T00:00:00Z",
      }],
    },
  }],
  payment_source: { card: { last_digits: "1111", brand: "VISA", expiry: "2030-12" } },
};

const CARD = { number: "4111111111111111", expiry: "2030-12", securityCode: "123" };

/** Stands in for the git-cache stub the Workshop passes to applyAction(); PayPal never uses it. */
const NO_CACHE = new RpcStub(new RpcTarget()) as never;

let counter = 0;
function gatekeeper() {
  return env.GATEKEEPER.get(env.GATEKEEPER.idFromName(`test-${++counter}`));
}

afterEach(() => setPayPalTransportForTesting(undefined));

describe("descriptions", () => {
  it("describes an auto-provisioned PayPal singleton", () => {
    expect(describeCustomVendor()).toMatchObject({ displayName: "PayPal (sandbox)", autoProvisionsAccount: true });
    expect(describeCustomAccount()).toMatchObject({ singleton: { tsType: "PayPalSandbox" } });
  });

  it("serves the agent-facing declaration", () => {
    expect(TYPES_CODE).toContain("export interface PayPalSandbox {");
    expect(TYPES_CODE).not.toContain("PROPOSAL");
  });
});

describe("reads", () => {
  let paypal: ReturnType<typeof fakePayPal>;
  beforeEach(() => {
    paypal = fakePayPal({
      "GET /v2/checkout/orders/ORDER1": () => ({ status: 200, body: AUTHORIZED_ORDER }),
      "GET /v2/payments/captures/MISSING": () => ({
        status: 404,
        body: {
          name: "RESOURCE_NOT_FOUND",
          message: "The specified resource does not exist.",
          debug_id: "dbg123",
          details: [{ issue: "INVALID_RESOURCE_ID", value: "MISSING", description: "Specified resource ID does not exist." }],
        },
      }),
    });
    setPayPalTransportForTesting(paypal.transport);
  });

  it("returns PayPal's answer in SDK shape and records the observation", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const { queue, observations } = fakeQueue();
      const session = await instance.startSession(queue as never);
      const result = await session.getOrder({ id: "ORDER1" });
      expect(result).toMatchObject({
        kind: "ok",
        httpStatus: 200,
        value: { id: "ORDER1", purchaseUnits: [{ payments: { authorizations: [{ id: "AUTH1", amount: { currencyCode: "USD", value: "19.99" } }] } }] },
      });
      expect(observations).toEqual([expect.objectContaining({ title: "Read PayPal order ORDER1" })]);
    });
    expect(paypal.sent.every(s => s.url.startsWith(SANDBOX))).toBe(true);
    expect(paypal.sent[0]!.headers.get("authorization")).toBe("Bearer test-token");
  });

  it("returns PayPal errors as values, without echoed field values", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const session = await instance.startSession(fakeQueue().queue as never);
      const result = await session.getCapturedPayment({ captureId: "MISSING" });
      expect(result).toEqual({
        kind: "error",
        error: {
          kind: "api",
          httpStatus: 404,
          name: "RESOURCE_NOT_FOUND",
          message: "The specified resource does not exist.",
          debugId: "dbg123",
          // `location` is the SDK's default for a detail that names none; the echoed `value` is gone.
          details: [{ issue: "INVALID_RESOURCE_ID", description: "Specified resource ID does not exist.", location: "body" }],
        },
      });
    });
  });

  it("refuses requests PayPal would reject, before sending anything", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const session = await instance.startSession(fakeQueue().queue as never);
      const search = await session.searchTransactions({ startDate: "2026-01-01T00:00:00Z", endDate: "2026-03-01T00:00:00Z" });
      expect(search).toMatchObject({ kind: "error", error: { kind: "invalid_request", message: expect.stringContaining("31 days") } });
      const card = await session.authorizeOrder({
        id: "ORDER1",
        payPalRequestId: "order-1-authorize",
        body: { paymentSource: { card: { ...CARD, number: "4111 1111 1111 1111" } } },
      });
      expect(card).toMatchObject({ kind: "error", error: { kind: "invalid_request" } });
      const amount = await session.createOrder({
        payPalRequestId: "order-1",
        body: { intent: "AUTHORIZE", purchaseUnits: [{ amount: { currencyCode: "USD", value: "19.999999" } }] },
      });
      expect(amount).toMatchObject({ kind: "error", error: { kind: "invalid_request" } });
    });
    expect(paypal.sent).toEqual([]);
  });
});

describe("writes", () => {
  let paypal: ReturnType<typeof fakePayPal>;
  beforeEach(() => {
    paypal = fakePayPal({
      "POST /v2/checkout/orders/ORDER1/authorize": () => ({ status: 201, body: AUTHORIZED_ORDER }),
      "POST /v2/payments/authorizations/AUTH1/capture": () => ({
        status: 422,
        body: {
          name: "UNPROCESSABLE_ENTITY",
          message: "The requested action could not be performed.",
          debug_id: "dbg456",
          details: [{ issue: "AUTHORIZATION_EXPIRED", description: "Authorization has expired." }],
        },
      }),
      "DELETE /v3/vault/payment-tokens/TOKEN1": () => ({ status: 204 }),
    });
    setPayPalTransportForTesting(paypal.transport);
  });

  it("returns the PayPal result of an auto-approved write and erases the card details", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper, state) => {
      const { queue, submitted } = fakeQueue(id => void instance.applyAction(id, NO_CACHE));
      const session = await instance.startSession(queue as never);
      const result = await session.authorizeOrder({
        id: "ORDER1",
        payPalRequestId: "order-1-authorize",
        body: { paymentSource: { card: CARD } },
      });
      expect(result).toMatchObject({
        kind: "ok",
        value: { status: "COMPLETED", purchaseUnits: [{ payments: { authorizations: [{ id: "AUTH1", status: "CREATED" }] } }] },
      });

      expect(submitted).toHaveLength(1);
      const description = submitted[0]!.description;
      expect(description).toMatchObject({ autoApprovable: true, awaitDecision: true, actionKind: PAYPAL_ACTION_KIND });
      expect(JSON.stringify(description)).not.toContain("4111111111111111");
      expect(JSON.stringify(description)).not.toContain("123\"");
      expect(JSON.stringify(description)).toContain("card ending 1111");

      const rows = state.storage.sql.exec("SELECT request, result FROM paypal_actions").toArray();
      expect(rows).toEqual([{ request: null, result: expect.any(String) }]);
      expect(String(rows[0]!.result)).not.toContain("4111111111111111");
    });
    expect(paypal.sent).toHaveLength(1);
    expect(paypal.sent[0]!.headers.get("paypal-request-id")).toBe("order-1-authorize");
    expect(paypal.sent[0]!.headers.get("prefer")).toBe("return=representation");
    expect(paypal.sent[0]!.body).toMatchObject({ payment_source: { card: { number: CARD.number, expiry: "2030-12", security_code: "123" } } });
  });

  it("answers a repeated payPalRequestId with the first outcome instead of acting twice", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const { queue, submitted } = fakeQueue(id => void instance.applyAction(id, NO_CACHE));
      const session = await instance.startSession(queue as never);
      const request = { id: "ORDER1", payPalRequestId: "order-1-authorize", body: { paymentSource: { card: CARD } } };
      const first = await session.authorizeOrder(request);
      const second = await session.authorizeOrder(request);
      expect(second).toEqual(first);
      expect(submitted).toHaveLength(1);
    });
    expect(paypal.sent).toHaveLength(1);
  });

  it("returns a PayPal decline of an applied write as an error outcome", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const session = await instance.startSession(fakeQueue(id => void instance.applyAction(id, NO_CACHE)).queue as never);
      const result = await session.captureAuthorizedPayment({ authorizationId: "AUTH1", payPalRequestId: "order-1-capture" });
      expect(result).toMatchObject({
        kind: "error",
        error: { kind: "api", httpStatus: 422, debugId: "dbg456", details: [{ issue: "AUTHORIZATION_EXPIRED" }] },
      });
    });
  });

  it("reports a declined write without calling PayPal", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper, state) => {
      const session = await instance.startSession(fakeQueue(id => void instance.rejectAction(id)).queue as never);
      const result = await session.deletePaymentToken({ id: "TOKEN1" });
      expect(result).toMatchObject({ kind: "declined" });
      expect(state.storage.sql.exec("SELECT state, request FROM paypal_actions").toArray())
        .toEqual([{ state: "declined", request: null }]);
    });
    expect(paypal.sent).toEqual([]);
  });

  it("answers pending when no decision arrives in time, then the outcome through getActionResult", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper, state) => {
      const store = new ActionStore(state.storage.sql);
      const { queue } = fakeQueue();
      const session = new PayPalSessionImpl(queue, {
        store,
        client: () => payPalClient({ PAYPAL_CLIENT_ID: "test-id", PAYPAL_CLIENT_SECRET: "test-secret" }),
        writeWaitMs: 20,
      });
      const pending = await session.deletePaymentToken({ id: "TOKEN1" });
      expect(pending).toMatchObject({ kind: "pending", actionId: expect.any(Number) });
      const actionId = (pending as { actionId: number }).actionId;
      await expect(session.getActionResult(actionId)).resolves.toMatchObject({ kind: "pending" });

      await instance.applyAction(actionId, NO_CACHE);
      await expect(session.getActionResult(actionId)).resolves.toEqual({ kind: "ok", httpStatus: 204, value: null });
    });
  });
});

describe("idempotency", () => {
  it("sends a write again under the same key when its outcome was unknown, and only then", async () => {
    let attempts = 0;
    const paypal = fakePayPal({
      "POST /v2/payments/captures/CAP1/refund": () => {
        attempts++;
        if (attempts === 1) throw new TypeError("connection reset");
        return { status: 201, body: { id: "REF1", status: "COMPLETED", amount: { currency_code: "USD", value: "5.00" } } };
      },
    });
    setPayPalTransportForTesting(paypal.transport);
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const { queue, submitted } = fakeQueue(id => void instance.applyAction(id, NO_CACHE));
      const session = await instance.startSession(queue as never);
      const request = { captureId: "CAP1", payPalRequestId: "shop-refund-CAP1-1", body: { amount: { currencyCode: "USD", value: "5.00" } } };
      await expect(session.refundCapturedPayment(request)).resolves.toMatchObject({ kind: "error", error: { kind: "network" } });
      await expect(session.refundCapturedPayment(request)).resolves.toMatchObject({ kind: "ok", value: { id: "REF1" } });
      await expect(session.refundCapturedPayment(request)).resolves.toMatchObject({ kind: "ok", value: { id: "REF1" } });
      expect(submitted).toHaveLength(2);
    });
    expect(attempts).toBe(2);
    expect(paypal.sent.map(s => s.headers.get("paypal-request-id"))).toEqual(["shop-refund-CAP1-1", "shop-refund-CAP1-1"]);
  });

  it("refuses a key reused for a different request", async () => {
    const paypal = fakePayPal({
      "POST /v2/payments/captures/CAP1/refund": () => ({ status: 201, body: { id: "REF1", status: "COMPLETED" } }),
    });
    setPayPalTransportForTesting(paypal.transport);
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      const session = await instance.startSession(fakeQueue(id => void instance.applyAction(id, NO_CACHE)).queue as never);
      const first = { captureId: "CAP1", payPalRequestId: "shop-refund-CAP1-1", body: { amount: { currencyCode: "USD", value: "5.00" } } };
      await expect(session.refundCapturedPayment(first)).resolves.toMatchObject({ kind: "ok" });
      const second = { ...first, body: { amount: { currencyCode: "USD", value: "3.00" } } };
      await expect(session.refundCapturedPayment(second)).resolves.toMatchObject({
        kind: "error", error: { kind: "invalid_request", message: expect.stringContaining("different") },
      });
    });
    expect(paypal.sent).toHaveLength(1);
  });

  it("matches a repeat by the card's last digits, never storing the number", async () => {
    await runInDurableObject(gatekeeper(), async (_instance: CustomGatekeeper, state) => {
      const store = new ActionStore(state.storage.sql);
      const session = new PayPalSessionImpl(fakeQueue().queue, { store, client: () => { throw new Error("unused"); }, writeWaitMs: 5 });
      await session.authorizeOrder({ id: "ORDER1", payPalRequestId: "k1", body: { paymentSource: { card: CARD } } });
      const [row] = state.storage.sql.exec("SELECT fingerprint FROM paypal_actions").toArray();
      expect(String(row!.fingerprint)).toContain("…1111");
      expect(String(row!.fingerprint)).not.toContain("4111111111111111");
      expect(String(row!.fingerprint)).not.toContain("123");
    });
  });
});

describe("configuration", () => {
  it("answers reads without credentials with NOT_CONFIGURED instead of throwing", async () => {
    await runInDurableObject(gatekeeper(), async (_instance: CustomGatekeeper, state) => {
      const session = new PayPalSessionImpl(fakeQueue().queue, {
        store: new ActionStore(state.storage.sql),
        client: () => payPalClient({}),
      });
      await expect(session.getOrder({ id: "ORDER1" })).resolves.toMatchObject({
        kind: "error", error: { kind: "api", name: "NOT_CONFIGURED" },
      });
    });
  });
});

describe("observers", () => {
  it("admits a collaborator only when they hold a PayPal sandbox account here", async () => {
    await runInDurableObject(gatekeeper(), async (instance: CustomGatekeeper) => {
      class Ours extends RpcTarget { holdsPayPalSandboxAccount() { return true; } }
      class Foreign extends RpcTarget { holdsPayPalSandboxAccount() { throw new Error("not ours"); } }
      const ours = new RpcStub(new Ours()) as never;
      const foreign = new RpcStub(new Foreign()) as never;
      await expect(instance.addObserver("a", ours)).resolves.toBeUndefined();
      await expect(instance.addObserver("b", foreign)).rejects.toThrow(/no PayPal sandbox connection/);
      await expect(instance.removeObserver("never-added")).resolves.toBeUndefined();
    });
  });
});
