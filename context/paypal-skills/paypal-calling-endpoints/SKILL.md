---
name: paypal-calling-endpoints
description: "Load before writing the first PAYPAL call in a Gadget's server.js or in executeCode: where the method and its request shape come from (describeBinding), the one flat request object, writing field names, the result envelope (ok / error / pending / declined), payPalRequestId, the defaults PayPal applies, walking a list one page per call, and running calls side by side."
---

# Calling PayPal through the `PAYPAL` binding

Every PayPal operation is a method directly on the binding — there is no client to build and no resource level:

```js
// In a Gadget's server.js (after setGadgetBinding({ gadget: "SHOP", source: "PAYPAL" })):
const result = await this.env.PAYPAL.getOrder({ id: order.paypalOrderId });

// In executeCode:
const result = await env.PAYPAL.getOrder({ id: "5O190127TN364715T" });
```

Only the Gadget's server and `executeCode` can call it. `client.js` has no `env`: it calls a method on its own server, which calls PayPal.

## Where to read an operation's shape

`describeBinding` on `PAYPAL` returns the declaration: the `PayPalSandbox` interface with one method per operation, each method's request type, the models, and doc comments. It is the only source — read the method's request type for the fields, the referenced models for their members, and the doc comment for what the operation *means* ("`intent: "AUTHORIZE"` and exactly one purchase unit", "Returns a NEW authorization: capture that one"). A field the declaration doesn't have doesn't exist here, whatever PayPal's REST documentation says.

## Method signature convention

```
PAYPAL.<operation>(request) → Promise<PayPalResult<T>>        // reads
PAYPAL.<operation>(request) → Promise<PayPalWriteResult<T>>   // writes
PAYPAL.getActionResult(actionId) → Promise<PayPalWriteResult<unknown>>
```

There is exactly **one request parameter**: a single object, even when it holds only an id. There is no options argument — no signal, timeout, retry or headers per call. `getActionResult` is the one method that takes a bare number.

## The request object is flat

A field named `body` *is* the whole JSON body PayPal receives; every other field is an addressing or header value the gatekeeper places for you (`id` and `authorizationId` in the path, `payPalRequestId` as the `PayPal-Request-Id` header, `startDate`/`page` in the query string). Never nest addressing fields inside `body`, and never spread body fields beside it:

```js
// ✅ right
await env.PAYPAL.authorizeOrder({
  id: orderId,
  payPalRequestId: `shop-order-${localId}-authorize-1`,
  body: { paymentSource: { card: { vaultId: savedCardToken } } },
});

// ❌ wrong — `paymentSource` is not a top-level field; `id` is not part of the body
await env.PAYPAL.authorizeOrder({ paymentSource: { card: { vaultId } }, body: { id: orderId } });
```

**Field names are the SDK's `camelCase` identifiers, never PayPal's wire names.** Write `purchaseUnits`, `currencyCode`, `payPalRequestId`; PayPal's documentation and error `field` paths say `purchase_units`, `currency_code`. Copy irregular casing exactly from the declaration: `payPalRequestId` and `payPalMockResponse` but `paypalFee` and `paypalReferenceId`. Gadget code is plain JavaScript: a misspelled field is not caught before run time — it is rejected, or silently ignored where the shape allows extras. Check each name against the declaration.

**`payPalRequestId`** is required on every money-moving and card-saving write. Derive it from your own record (`shop-order-${orderId}-capture-1`), never from a per-attempt random value; one id names one request (`paypal-resilience` has the rules). **`payPalMockResponse`** exists for tests only (`paypal-testing`).

## Building a request

A request is a plain object literal — no classes, no constructors, no helpers:

```js
const order = await env.PAYPAL.createOrder({
  payPalRequestId: `shop-order-${localId}-create-1`,
  body: {
    intent: "AUTHORIZE",
    purchaseUnits: [{ amount: { currencyCode: "USD", value: "42.50" }, invoiceId: `shop-${localId}` }],
  },
});
```

- **Omit an optional field rather than setting it to `undefined` or `null`.** No field in this declaration is nullable.
- **An optional-looking `body` is not permission to omit it.** `authorizeOrder`'s `body?` is optional only when the order was created with `paymentSource.card`; otherwise PayPal refuses the authorization because no card was given.
- **A card is one of two shapes, never both:** new details `{ number, expiry, securityCode, name? }`, or a saved card `{ vaultId }`.
- Build each request afresh from declared fields; never pass a response object (or a spread of one) back as a request — it carries extra members (`paypal-models`).

## Defaults are applied, not omitted

A field you leave out takes the default its doc comment names, and PayPal acts on it: `finalCapture` absent is `true` (the rest of the hold is released after the capture), `body.amount` absent on a capture or refund means the full amount / everything not yet refunded, `pageSize` absent is 100 for `searchTransactions` and 5 for `listCustomerPaymentTokens`, `page` absent is 1, and `searchTransactions` lists only balance-affecting records unless `balanceAffectingRecordsOnly: false`. Read the doc comment before concluding PayPal dropped data. (POST answers are always full: the gatekeeper asks PayPal for the complete resource.)

## Values are checked before anything is sent

Two layers stand before PayPal:

1. **Shape** — a value of the wrong type (`value: 42.5` as a number, a missing required field, an unknown method) makes the call **reject**: a plain `Error`, so keep a `try`/`catch` around calls.
2. **Value rules** — the gatekeeper answers `{ kind: "error", error: { kind: "invalid_request", message } }` and sends nothing: id formats, `payPalRequestId` format and reuse, money strings, card formats, the 31-day search window, page sizes (the full list is in `paypal-getting-started`). Fix the request; never retry it unchanged.

PayPal checks the rest itself and refuses with an `"api"` error you have to interpret (`paypal-error-handling`).

## Making the call and reading the result

Every call **resolves**; a PayPal refusal is a value, not an exception:

```js
const r = await this.env.PAYPAL.captureAuthorizedPayment({
  authorizationId: order.authorizationId,
  payPalRequestId: `shop-order-${order.id}-capture-${order.captureAttempt}`,
});
switch (r.kind) {
  case "ok":       /* r.httpStatus, r.value (CapturedPayment) */ break;
  case "error":    /* r.error — paypal-error-handling */ break;
  case "pending":  /* store r.actionId; show "processing"; getActionResult later */ break;
  case "declined": /* the user refused it; nothing was sent */ break;
}
```

- Reads return `ok` or `error` only. Writes can also return `pending` (accepted, not run yet: the binding waits up to 25 seconds for auto-approval before answering this) and `declined`.
- On `pending`, persist the `actionId` with the operation it belongs to — `getActionResult` returns `unknown` typing — and **never repeat the call**. In `executeCode`, return and check `getActionResult` after the next turn starts.
- The only status you get is `httpStatus`; no headers. For support, quote `error.debugId`.
- Calls still reject for binding faults (not attached, wrong names or types) — keep the `try`/`catch`, and never read a rejection as "PayPal refused".

## The success value

`ok` with a `value` is PayPal saying the call succeeded — not that the business outcome is what you wanted. A card hold can come back `ok` with `authorizations[0].status === "DENIED"`; a capture can be `ok` with `status` `"PENDING"` or `"DECLINED"`. Read the status the contract sheet names. `deletePaymentToken` answers `{ kind: "ok", httpStatus: 204, value: null }`: resolving *is* the success signal; if you need to show the resulting state, read it (`getPaymentToken` → `RESOURCE_NOT_FOUND`).

## A list, one page per call

No operation pages for you. `searchTransactions` and `listCustomerPaymentTokens` each return one page; you advance `page` yourself and stop on the page count — with a bound of your own:

```js
async function allTransactions(paypal, startDate, endDate, maxPages = 50) {
  const items = [];
  for (let page = 1; page <= maxPages; page++) {
    const r = await paypal.searchTransactions({ startDate, endDate, page, pageSize: 500 });
    if (r.kind !== "ok") return { complete: false, items, error: r.error };
    items.push(...(r.value.transactionDetails ?? []));
    const total = r.value.totalPages ?? 1;
    if (page >= total || (r.value.transactionDetails ?? []).length === 0) return { complete: true, items };
  }
  return { complete: false, items, error: { kind: "page_cap", message: `stopped after ${maxPages} pages` } };
}
```

- `searchTransactions` covers at most 31 days per call: split a longer range into windows (`paypal-resilience`). New transactions can take up to 3 hours to appear.
- `listCustomerPaymentTokens` returns `totalPages` only with `totalRequired: true`; without it, stop on a short page.
- **Every walk needs a bound of your own** (a page cap, and a time budget — each page can take a while), and a walk that stopped early must say so rather than return a partial list that reads as complete.

## Running calls side by side

The binding can take concurrent calls, but bound them once the list is data (refund every capture of an order, check twenty authorizations): run them a few at a time rather than one `Promise.all` over the whole list.

```js
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const i = next++; out[i] = await fn(items[i], i); }
  }));
  return out;
}
```

Because PayPal failures resolve as envelopes, `Promise.all` rejects only on a binding fault — use `Promise.allSettled` when one rejected call must not hide the others' results. Each write in a batch is its own logged action (and its own approval, without auto-approval), so batches of writes should be small and deliberate.

## Next

- **paypal-models** — money strings, timestamps, optional members, statuses.
- **paypal-error-handling** — reading `error`, issue codes, what to show.
- **paypal-resilience** — `payPalRequestId`, unknown outcomes, `pending`, page bounds.
