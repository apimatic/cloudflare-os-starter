---
name: paypal-models
description: "Load before building a request object for the PAYPAL binding or reading a value it returns: plain objects, camelCase names, omitting vs sending a field, every response field optional, guarding nested reads, open status enums, money as decimal strings, RFC 3339 timestamps, and the extra members responses carry."
---

# Working with PayPal models

A model here — `OrderRequest`, `Order`, `CapturedPayment`, `Money` — is the **name of a shape in the binding's declaration, not a class**. Build one with an object literal and read one with plain property access; there is nothing to import or construct. A returned value is an ordinary object: you can store it, copy it, or map it into your own shape.

```js
const unit = { amount: { currencyCode: "USD", value: "19.99" }, invoiceId: "shop-1042" };
const r = await env.PAYPAL.createOrder({ payPalRequestId: "shop-order-1042-create-1", body: { intent: "AUTHORIZE", purchaseUnits: [unit] } });
if (r.kind === "ok") console.log(r.value.id, r.value.status);
```

Names come from `describeBinding` on `PAYPAL`; never from memory or PayPal's REST docs.

## Required and optional

| Declared | What to write |
| --- | --- |
| `field: T` | always send it |
| `field?: T` | send a value, or **omit the key** |

No field in this declaration is nullable: never send `null`. An explicit `undefined` is treated as omitted, but omitting the key is the habit to keep. A defaulted field is applied when omitted (`finalCapture` → `true`; a capture's or refund's `amount` → the full amount): omitting it is a choice with a consequence, not a neutral act (`paypal-integrate` 1b.3).

### Reading one back

**Every response field is optional** — PayPal omits what doesn't apply, and a thin or truncated answer still arrives as `kind: "ok"` with members missing. `?.` and `??` are the whole toolkit; `!== undefined` is the precise presence test (never `in` or `Object.keys` — whether a missing member arrives as an absent key or as a key holding `undefined` is not something to depend on). Guard arrays before reaching through them:

```js
const auth = r.value.purchaseUnits?.[0]?.payments?.authorizations?.[0];
if (!auth?.id) { /* not a usable hold: treat a write as outcome-unknown (paypal-resilience) */ }
```

⚠ A response type with no required members decodes an empty answer without complaint. Assert the members you depend on right after the call (`value.id`, the authorization's `id` and `status`, the capture's `sellerReceivableBreakdown`), and never infer a response's shape from the request's: `PurchaseUnitRequest.amount` is required, `PurchaseUnit.amount` is not.

## One-of shapes

The declaration has no unions to construct. Two shapes are "one of":

- **A card** is new details `{ number, expiry, securityCode, name? }` **or** a saved card `{ vaultId }` — never both (`invalid_request`).
- **A payment source** is `{ card: … }` — the only source this binding supports.

## Collections

Arrays are plain arrays: `purchaseUnits`, `payments.authorizations`, `transactionDetails`, `paymentTokens`, `details`. An absent array is `undefined`, not `[]`: read with `?? []`.

## Money, dates and numbers

**Money is a decimal string, end to end.** `Money` is `{ currencyCode, value }` and `value` is a string such as `"19.99"`. There is no decimal type: keep it a string, and never round-trip it through `Number` for display or storage — that is what silently turns `"10.10"` into `10.1` and `0.1 + 0.2` into `0.30000000000000004`.

- Do arithmetic in **integer minor units** (cents): `Math.round(Number(value) * 100)` on the way in only if you must parse, and format back with the currency's decimals — `"10.00"` for USD, no decimals for JPY. Better: keep prices in cents in your own records and format to a string only when building a request.
- Amounts PayPal reports for money leaving the merchant are negative strings (a refund's `transactionAmount.value` in `searchTransactions` is `"-5.00"`).
- Compare money as minor units, never as strings (`"9.50" > "10.00"` is true).

**Timestamps are RFC 3339 strings**, not `Date` objects: `expirationTime`, `createTime`, `transactionInitiationDate`. Compare them via `Date.parse(…)`. When you send one (`searchTransactions`' `startDate`/`endDate`), send `new Date(…).toISOString()` — seconds and an offset are required; `"2026-11-01T00:00:00"` (no offset) and `"2026-11-01"` are refused.

**Card `expiry`** is `"YYYY-MM"` in requests and responses.

**Counts** (`page`, `pageSize`, `totalPages`, `totalItems`) are integers.

**A field pinned to one value** carries it as a literal: `storeInVault: "ON_SUCCESS"` is the only value.

## What is checked — and what is not

The gatekeeper checks formats before sending and answers `invalid_request` for a malformed one: money strings, card fields, ids, `payPalRequestId`, the search window (`paypal-getting-started` lists them). Everything else — a reused `invoiceId`, an amount over what remains to refund, decimals a currency does not allow, an over-long text — PayPal checks, and refuses with an `"api"` error you have to interpret (`paypal-error-handling`).

## Status enums are open

`OrderStatus`, `AuthorizationStatus`, `CaptureStatus`, `RefundStatus` and the like list the values known today and end in `(string & {})`: **PayPal may send a value that is not in the list**. Write them as plain strings (`intent: "AUTHORIZE"`), and give every `switch` over a received status a `default` arm — an `if/else` chain with no final `else` silently does nothing for a new value.

```js
switch (auth.status) {
  case "CREATED": return held(auth);
  case "DENIED": return declined(auth);
  case "PENDING": return underReview(auth);
  default: return unknownStatus(auth.status); // new or unexpected: never treat as success
}
```

Watch the words that look alike: the **result** kinds `pending` (accepted, not yet run) and `declined` (the user refused the call) are not PayPal's **statuses** `"PENDING"` (PayPal is still processing) and `"DENIED"` / `"DECLINED"` (PayPal or the card issuer refused). An authorization that has lapsed is not a status value either: a capture of it fails with issue `AUTHORIZATION_EXPIRED`.

## Names: camelCase here, snake_case on the wire

You always write and read `purchaseUnits`, `currencyCode`, `sellerReceivableBreakdown`; PayPal's own wire format — and its documentation, and an error's `details[].field` path such as `/purchase_units/0/amount/value` — says `purchase_units`, `currency_code`. Translate when you read a PayPal path; never write a snake_case name into a request.

## Members you didn't declare

Only the members a store needs are declared; responses carry more:

- other SDK members, in camelCase (`links`, `updateTime`, `payer`, …);
- under **`additionalProperties`**, members the SDK itself doesn't model, keyed by PayPal's **snake_case wire names**.

Ignore them unless the task needs one — and then mark it **UNVERIFIED** until a sandbox run shows it. Never send a response object, or a spread of one, back as a request: it would carry those extras. A **misspelled** property is not an error either: `invoiceID` in a request is simply not the field PayPal reads. Check spelling against the declaration.

## Storing and returning models

PayPal values are plain JSON — strings, numbers, booleans, arrays, objects — so storing them in Durable Object storage is safe. Store only what you need (ids, statuses, amounts, `lastDigits`), never card details. When `server.js` answers `client.js`, map the model into your own small shape at that boundary rather than forwarding PayPal's object.

## Next

- **paypal-calling-endpoints** — the request object and the result envelope.
- **paypal-error-handling** — what an `error` result carries.
