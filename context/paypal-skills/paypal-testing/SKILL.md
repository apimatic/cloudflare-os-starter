---
name: paypal-testing
description: "Load before verifying Gadget or executeCode code that uses the PAYPAL binding: designing the payments code so a fake PAYPAL can stand in, a fake that returns result envelopes and records the requests it got, asserting what your code sent, covering declined / expired / over-refund / network / pending / declined-by-user / not-configured paths, and sandbox runs with payPalMockResponse and test cards."
---

# Testing code that uses `PAYPAL`

There is no test runner here; you verify by running code. Two layers, kept separate:

1. **Against a fake `PAYPAL`** — fast, free, and the only way to produce every failure on demand. Most checks belong here.
2. **Against the sandbox** — proves the requests are ones PayPal accepts. Few, deliberate runs: each write is logged and may need the user's approval.

## Design for it

Keep PayPal logic in one module of the Gadget (e.g. `payments.js`) whose functions take the binding as a parameter — `authorizePayment(paypal, sql, input)` — and have `server.js` pass `this.env.PAYPAL`. Taking the binding as a parameter is what makes the logic testable: a test passes a fake instead.

To run tests, give the Gadget's server a test method that imports the module, runs the cases against a fake and an in-memory or scratch store, and returns a summary; call it from `executeCode` with `await env.<GADGET>.rpc.selfTest()`. Remove or disable it before the Gadget is shared.

## A fake `PAYPAL`

The fake answers like the binding — **envelopes, not exceptions** — and records every call:

```js
export function fakePayPal(answers = {}) {
  const calls = [];
  const used = new Map(); // `${op}:${payPalRequestId}` → { request, result }, like the gatekeeper
  const handler = {
    get(_, op) {
      return async request => {
        calls.push({ op, request: structuredClone(request) });
        const key = request?.payPalRequestId && `${op}:${request.payPalRequestId}`;
        if (key && used.has(key)) {
          const prior = used.get(key);
          if (JSON.stringify(prior.request) !== JSON.stringify(request)) {
            return { kind: "error", error: { kind: "invalid_request", message: "payPalRequestId reused for a different request" } };
          }
          return prior.result;
        }
        const queue = answers[op];
        const result = typeof queue === "function" ? await queue(request) : queue?.shift?.();
        if (!result) throw new Error(`fake PAYPAL: no answer queued for ${op}`);
        if (key) used.set(key, { request, result });
        return result;
      };
    },
  };
  return { paypal: new Proxy({}, handler), calls };
}
```

Mirror only what the real binding does: it throws only for binding faults (here: an unqueued call, which is a test bug), and remembers each `payPalRequestId`. (The real one also re-sends a repeated key whose outcome was `network`, a 5xx or `declined`; model that in a test that needs it.)

## Answers in model shape

Fake answers are **model shape** — the camelCase names from the declaration — not PayPal's snake_case JSON:

```js
const held = { kind: "ok", httpStatus: 201, value: {
  id: "ORDER-1", status: "COMPLETED",
  purchaseUnits: [{ payments: { authorizations: [{ id: "AUTH-1", status: "CREATED",
    amount: { currencyCode: "USD", value: "42.50" }, expirationTime: "2026-12-20T10:00:00Z" }] } }],
  paymentSource: { card: { brand: "VISA", lastDigits: "1111", expiry: "2030-12" } },
} };
```

- Money `value`s are strings; timestamps are RFC 3339 strings.
- Include answers with members **missing** (`{ kind: "ok", httpStatus: 201, value: {} }`): every response member is optional, and your code must not treat an `ok` without an `id` as a completed payment.
- Include a status your code does not know (`status: "SOMETHING_NEW"`): the enums are open.

## Assert what your code sent

A test that checks only the result proves only that something was sent. From `calls`, assert:

- the operation, and that each write carries `payPalRequestId` — **the same** when the same action runs twice (a double-click), **different** for a second partial refund or a retry after a decline;
- `createOrder` uses `intent: "AUTHORIZE"` with one purchase unit whose `amount.value` is a string equal to the order total to the cent ("42.50", never `42.5`);
- a card is either `{ vaultId }` or `{ number, expiry, securityCode }`, never both, and a `vaultId` is one of **this shopper's** saved cards (the invariant check ran and the binding was not called for a foreign one);
- after `reauthorizePayment`, the capture uses the **new** authorization id;
- no key your code set without a contract-sheet row requires it (`paypal-integrate` 1b.3), and never `payPalMockResponse` on a production path;
- **card digits never reach storage or logs**: after a payment, search everything the Gadget stored for the card number.

## The paths to cover

| Path | Fake answer | Expect |
| --- | --- | --- |
| card declined | `{ kind: "error", error: { kind: "api", httpStatus: 422, name: "UNPROCESSABLE_ENTITY", details: [{ issue: "INSTRUMENT_DECLINED" }] } }` | a clear "try another card", the order still payable, the next attempt with a new key |
| declined as success | `ok` with authorization `status: "DENIED"` | the same as a decline — not a hold |
| hold expired at fulfilment | capture → `AUTHORIZATION_EXPIRED`; `reauthorizePayment` → `ok` with a new id | capture retried on the new id |
| hold can't be renewed | capture → `AUTHORIZATION_EXPIRED`; reauthorize → an `api` error | an operator message that says nothing was charged and what to do |
| over-refund | `REFUND_AMOUNT_EXCEEDED` | refused with the reason; your own refundable balance never goes below zero |
| lost answer on a write | `{ kind: "error", error: { kind: "network", message: "…" } }` | the settling read (or same-key repeat) is made; the order is not marked failed |
| never sent | `invalid_request` | the claim released; no settling read |
| pending | `{ kind: "pending", actionId: 7, message: "…" }`, then `getActionResult` → `ok` | "processing", the `actionId` stored, the write **not** repeated |
| user declined | `{ kind: "declined", message: "…" }` | no automatic retry |
| not configured | `{ kind: "error", error: { kind: "api", name: "NOT_CONFIGURED", message: "…" } }` | a fixed "payments unavailable" message; the input is not blamed |
| binding fault | the fake throws | a service error, not "declined" |
| page walk that never ends | `searchTransactions` answering `totalPages: 10000` | the walk stops at your cap and reports incomplete |
| long range | a 60-day reconciliation | split into windows of ≤ 31 days |

Also test through your own boundary: for each failure, assert the **reason is in your Gadget's answer** — a test that checks only that it failed passes on code that logs the reason and drops it. Never assert on the wording of `error.message`; assert on `kind`, `error.kind` and the issue code.

## Against the sandbox

Keep these runs separate from the fake ones, and never assert on ids or timestamps PayPal generates — assert on statuses and amounts.

- Reads run immediately. Writes are logged and may need the user's approval; with auto-approval of "PayPal sandbox payments" off they answer `pending`: in `executeCode`, return and check `getActionResult` after the next turn.
- Use a **unique `payPalRequestId` per test run** (`test-${Date.now()}-authorize`): an id's outcome is remembered, and a test id must never be one your real records could produce.
- **Force a failure** with `payPalMockResponse` on the calls that move money: `'{"mock_application_codes":"INSTRUMENT_DECLINED"}'` on `authorizeOrder` or `createOrder`, `'{"mock_application_codes":"AUTHORIZATION_EXPIRED"}'` on `captureAuthorizedPayment`. Other issue codes from an operation's PayPal error list are **UNVERIFIED** until a run shows them. The 3-day hold period cannot be waited out: cover reauthorization with a mock.
- **Cards**: use test card numbers from the PayPal developer dashboard's card generator; `4111111111111111` with a future `"YYYY-MM"` expiry and any 3-digit code commonly works in the sandbox (**UNVERIFIED** for this account). Never a real card.
- `invalid_request` paths ("4111 1111 1111 1111", a number amount, a 60-day range) cost nothing: nothing is sent or stored.
- Don't expect a new payment in `searchTransactions` right away (up to 3 hours). Expect the sandbox to be slow or flaky at times: a failed sandbox run is a reason to look, not proof of a bug.

## Next

- **paypal-error-handling** — what each failure means.
- **paypal-resilience** — keys, unknown outcomes, pending, page walks.
