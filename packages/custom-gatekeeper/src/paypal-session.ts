// `env.PAYPAL`: the session agents and Gadgets call.
//
// Reads call PayPal at once and are recorded as observations. Writes are submitted to the approval
// queue and run only from `applyAction()`; nothing about a pending write is simulated, so each one
// asks the agent to wait for the decision (`awaitDecision`). The Workshop applies an auto-approved
// write just after `submitAction()` returns, never inside it, so a write waits here a short while
// for its own outcome and returns it directly, falling back to `kind: "pending"`.

import { RpcTarget } from "cloudflare:workers";
import { validateRpc } from "capnweb-validate";
import type { ActionKind, ApprovalQueue } from "@gadgets/workshop-shared/gatekeeper";
import type { PayPalServerSdkClient } from "paypal-server-sdk";
import type { ActionStore, StoredAction } from "./paypal-actions.js";
import { PayPalNotConfiguredError } from "./paypal-client.js";
import { UNREADABLE_RESPONSE } from "./paypal-errors.js";
import {
  checkRequest,
  fingerprintOf,
  OPERATIONS,
  type OperationName,
  type RequestOf,
  runOperation,
} from "./paypal-operations.js";
import type {
  CapturedPayment,
  CustomerVaultPaymentTokensResponse,
  Order,
  OrderAuthorizeResponse,
  PaymentAuthorization,
  PaymentTokenResponse,
  PayPalResult,
  PayPalSandbox,
  PayPalWriteResult,
  Refund,
  SearchResponse,
} from "./types.js";

/**
 * Every PayPal write is one kind, so a user enables auto-approval with one switch. Payments and
 * deletions would otherwise be `autoApprovable: false` (write-gatekeeper rules 1 and 3); this
 * gatekeeper reaches the PayPal sandbox only, where no real money or customer data exists.
 */
export const PAYPAL_ACTION_KIND: ActionKind = { tag: "paypal-sandbox-payments", label: "PayPal sandbox payments" };

/** How long a write waits for its own decision before answering `kind: "pending"`. */
export const WRITE_WAIT_MS = 25_000;

type ObservationQueue = Pick<ApprovalQueue, "authorizeObservation" | "submitAction"> &
  Partial<{ [Symbol.dispose](): void }>;

export type SessionHost = {
  store: ActionStore;
  /** The PayPal client; throws `PayPalNotConfiguredError` when the deployment has no credentials. */
  client(): PayPalServerSdkClient;
  writeWaitMs?: number;
};

@validateRpc()
export class PayPalSessionImpl extends RpcTarget implements PayPalSandbox {
  readonly #queue: ObservationQueue;
  readonly #host: SessionHost;

  constructor(queue: ObservationQueue, host: SessionHost) {
    super();
    this.#queue = queue;
    this.#host = host;
  }

  createOrder(request: RequestOf<"createOrder">): Promise<PayPalWriteResult<Order>> {
    return this.#write("createOrder", request, request.payPalRequestId) as Promise<PayPalWriteResult<Order>>;
  }

  authorizeOrder(request: RequestOf<"authorizeOrder">): Promise<PayPalWriteResult<OrderAuthorizeResponse>> {
    return this.#write("authorizeOrder", request, request.payPalRequestId) as Promise<PayPalWriteResult<OrderAuthorizeResponse>>;
  }

  getOrder(request: RequestOf<"getOrder">): Promise<PayPalResult<Order>> {
    return this.#read("getOrder", request) as Promise<PayPalResult<Order>>;
  }

  getAuthorizedPayment(request: RequestOf<"getAuthorizedPayment">): Promise<PayPalResult<PaymentAuthorization>> {
    return this.#read("getAuthorizedPayment", request) as Promise<PayPalResult<PaymentAuthorization>>;
  }

  captureAuthorizedPayment(request: RequestOf<"captureAuthorizedPayment">): Promise<PayPalWriteResult<CapturedPayment>> {
    return this.#write("captureAuthorizedPayment", request, request.payPalRequestId) as Promise<PayPalWriteResult<CapturedPayment>>;
  }

  reauthorizePayment(request: RequestOf<"reauthorizePayment">): Promise<PayPalWriteResult<PaymentAuthorization>> {
    return this.#write("reauthorizePayment", request, request.payPalRequestId) as Promise<PayPalWriteResult<PaymentAuthorization>>;
  }

  voidPayment(request: RequestOf<"voidPayment">): Promise<PayPalWriteResult<PaymentAuthorization>> {
    return this.#write("voidPayment", request, request.payPalRequestId) as Promise<PayPalWriteResult<PaymentAuthorization>>;
  }

  getCapturedPayment(request: RequestOf<"getCapturedPayment">): Promise<PayPalResult<CapturedPayment>> {
    return this.#read("getCapturedPayment", request) as Promise<PayPalResult<CapturedPayment>>;
  }

  refundCapturedPayment(request: RequestOf<"refundCapturedPayment">): Promise<PayPalWriteResult<Refund>> {
    return this.#write("refundCapturedPayment", request, request.payPalRequestId) as Promise<PayPalWriteResult<Refund>>;
  }

  getRefund(request: RequestOf<"getRefund">): Promise<PayPalResult<Refund>> {
    return this.#read("getRefund", request) as Promise<PayPalResult<Refund>>;
  }

  createPaymentToken(request: RequestOf<"createPaymentToken">): Promise<PayPalWriteResult<PaymentTokenResponse>> {
    return this.#write("createPaymentToken", request, request.payPalRequestId) as Promise<PayPalWriteResult<PaymentTokenResponse>>;
  }

  listCustomerPaymentTokens(request: RequestOf<"listCustomerPaymentTokens">): Promise<PayPalResult<CustomerVaultPaymentTokensResponse>> {
    return this.#read("listCustomerPaymentTokens", request) as Promise<PayPalResult<CustomerVaultPaymentTokensResponse>>;
  }

  getPaymentToken(request: RequestOf<"getPaymentToken">): Promise<PayPalResult<PaymentTokenResponse>> {
    return this.#read("getPaymentToken", request) as Promise<PayPalResult<PaymentTokenResponse>>;
  }

  deletePaymentToken(request: RequestOf<"deletePaymentToken">): Promise<PayPalWriteResult<null>> {
    // PayPal takes no idempotency key here; deleting the same token twice is one deletion.
    return this.#write("deletePaymentToken", request, `token:${request.id}`) as Promise<PayPalWriteResult<null>>;
  }

  searchTransactions(request: RequestOf<"searchTransactions">): Promise<PayPalResult<SearchResponse>> {
    return this.#read("searchTransactions", request) as Promise<PayPalResult<SearchResponse>>;
  }

  async getActionResult(actionId: number): Promise<PayPalWriteResult<unknown>> {
    if (!Number.isSafeInteger(actionId)) throw new Error("getActionResult() needs the actionId of a pending result.");
    if (!this.#host.store.get(actionId)) throw new Error(`No PayPal call with actionId ${actionId} in this workspace.`);
    return this.#outcome(actionId);
  }

  [Symbol.dispose](): void {
    this.#queue[Symbol.dispose]?.();
  }

  async #read(op: OperationName, request: unknown): Promise<PayPalResult<unknown>> {
    const invalid = checkRequest(op, request);
    if (invalid) return { kind: "error", error: invalid };

    let client: PayPalServerSdkClient;
    try {
      client = this.#host.client();
    } catch (err) {
      if (err instanceof PayPalNotConfiguredError) return notConfigured(err);
      throw err;
    }
    const result = await runOperation(client, op, request);
    await this.#queue.authorizeObservation({
      title: OPERATIONS[op].title(request),
      description: `${OPERATIONS[op].title(request)} in the deployment's PayPal sandbox account.`,
    });
    return result;
  }

  async #write(op: OperationName, request: unknown, key: string): Promise<PayPalWriteResult<unknown>> {
    const invalid = checkRequest(op, request);
    if (invalid) return { kind: "error", error: invalid };

    const store = this.#host.store;
    const fingerprint = fingerprintOf(request);
    const earlier = store.findByKey(op, key);
    if (earlier) {
      if (earlier.fingerprint !== fingerprint) {
        return {
          kind: "error",
          error: {
            kind: "invalid_request",
            message: `payPalRequestId "${key}" was already used for a different ${op} request in this workspace. ` +
              "Use a new payPalRequestId for a new request (e.g. a second partial refund).",
          },
        };
      }
      if (!mayRetry(earlier)) {
        await store.waitForDecision(earlier.id, this.#host.writeWaitMs ?? WRITE_WAIT_MS);
        return this.#outcome(earlier.id);
      }
      // The earlier attempt never reached PayPal, or nobody knows whether it did: submit it again
      // under the same key, which PayPal itself deduplicates if the first one did land.
      store.retire(earlier.id);
    }

    const summary = OPERATIONS[op].summarize!(request);
    const id = store.insert(op, key, fingerprint, request);
    try {
      await this.#queue.submitAction(id, {
        title: summary.title,
        description: summary.description,
        fields: summary.fields,
        implementsRevert: false,
        // Nothing is simulated: a later read would not show this write until it is applied.
        awaitDecision: true,
        autoApprovable: true,
        actionKind: PAYPAL_ACTION_KIND,
      });
    } catch (err) {
      store.remove(id);
      throw err;
    }

    await store.waitForDecision(id, this.#host.writeWaitMs ?? WRITE_WAIT_MS);
    return this.#outcome(id);
  }

  async #outcome(id: number): Promise<PayPalWriteResult<unknown>> {
    const action = this.#host.store.get(id)!;
    switch (action.state) {
      case "pending":
      case "applying":
        return {
          kind: "pending",
          actionId: id,
          message:
            `The PayPal call (${action.op}) was accepted but has not run yet: it is waiting for the ` +
            `user to approve it, or for auto-approval of "${PAYPAL_ACTION_KIND.label}". If this ` +
            `code runs in executeCode, return now so the approval can appear; afterwards call ` +
            `getActionResult(${id}) for the outcome. Do not repeat the call.`,
        };
      case "declined":
        return { kind: "declined", message: `The user did not allow this PayPal call (${action.op}); nothing was sent to PayPal.` };
      case "applied": {
        // The result reached this connection while nobody was looking, so handing it over is the
        // observation.
        await this.#queue.authorizeObservation({
          title: `Read the result of PayPal ${action.op} #${id}`,
          description: `Read the outcome of a PayPal call (${action.op}) in the deployment's PayPal sandbox account.`,
            });
        return action.result!;
      }
    }
  }
}

const RETRYABLE_NAMES = new Set(["NOT_CONFIGURED", "AUTHENTICATION_FAILURE", UNREADABLE_RESPONSE]);

/**
 * Whether a finished write may be submitted again under its key: it was declined (nothing reached
 * PayPal), its outcome is unknown (no connection, an unreadable answer, a PayPal server error) or
 * it never got that far (credentials missing or refused). Any other PayPal answer, success or
 * refusal, is final for its key; PayPal deduplicates a resend of one that did land.
 */
function mayRetry(action: StoredAction): boolean {
  if (action.state === "declined") return true;
  if (action.state !== "applied" || action.result?.kind !== "error") return false;
  const error = action.result.error;
  if (error.kind === "network") return true;
  if (error.kind !== "api") return false;
  return (error.name !== undefined && RETRYABLE_NAMES.has(error.name)) ||
    (error.httpStatus !== undefined && error.httpStatus >= 500);
}

function notConfigured(err: PayPalNotConfiguredError): PayPalResult<never> {
  return { kind: "error", error: { kind: "api", name: "NOT_CONFIGURED", message: err.message } };
}
