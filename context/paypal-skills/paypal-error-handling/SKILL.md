---
name: paypal-error-handling
description: "Load before handling the result of any PAYPAL call: the kind envelope (ok / error / pending / declined), PayPalError (api / invalid_request / network), branching on details[].issue (INSTRUMENT_DECLINED, AUTHORIZATION_EXPIRED, REFUND_AMOUNT_EXCEEDED, …), unknown outcomes on writes, deployment-configuration errors, what still throws over RPC, and presenting failures to a Gadget's user without leaking card data."
---

# Handling PayPal results and errors

A PayPal failure is **never thrown**: every `PAYPAL` call resolves to an envelope, and failures are values. Handle two levels, plus one `try`/`catch`:

1. `result.kind` — `"ok"`, `"error"`, and for writes `"pending"` and `"declined"`.
2. `result.error.kind` — `"api"`, `"invalid_request"`, `"network"`.
3. A `try`/`catch` for what still rejects: binding faults, which arrive as a plain `Error` with a message and nothing else.

```js
async function authorize(paypal, req) {
  let r;
  try {
    r = await paypal.authorizeOrder(req);
  } catch (e) {
    return { outcome: "unavailable" };                       // binding fault — not a PayPal refusal
  }
  switch (r.kind) {
    case "ok":       return fromAuthorization(r.value);      // still check the authorization status
    case "pending":  return { outcome: "processing", actionId: r.actionId };
    case "declined": return { outcome: "not_approved" };     // nothing reached PayPal
    case "error":    return fromError(r.error);
    default:         return { outcome: "unknown" };
  }
}
```

## `PayPalError`

| Member | Meaning |
| --- | --- |
| `kind` | `"api"`: PayPal answered with an error (or no usable answer — see `name`). `"invalid_request"`: refused before anything was sent. `"network"`: PayPal could not be reached or did not answer in time |
| `httpStatus` | PayPal's status, when there was one |
| `name` | PayPal's error name (`UNPROCESSABLE_ENTITY`, `RESOURCE_NOT_FOUND`, `INVALID_REQUEST`, …) or the gatekeeper's own: `NOT_CONFIGURED`, `AUTHENTICATION_FAILURE`, `UNREADABLE_RESPONSE` |
| `message` | a summary; safe to log, never contains card details |
| `debugId` | PayPal's debug id — log it; quote it to PayPal support |
| `details[]` | PayPal's specific issues: `issue` (the code to branch on), `description`, `field` (a snake_case wire path), `location` |

How each failure reaches you:

| What happened | Reaches you as |
| --- | --- |
| PayPal answered 4xx/5xx with an error body | `api`, `httpStatus`, `name`, `message`, `debugId`, `details` (a rejected field's *value* is never included) |
| PayPal answered but the answer could not be read | `api`, `name: "UNREADABLE_RESPONSE"` (with `httpStatus` when there was one) |
| connection failure or timeout | `network` |
| a malformed value, a reused `payPalRequestId`, a range over 31 days | `invalid_request`, nothing sent |
| the deployment has no PayPal credentials | `api`, `name: "NOT_CONFIGURED"`, no `httpStatus` |
| PayPal issued no access token (credentials refused, or its token service is down) | `api`, `name: "AUTHENTICATION_FAILURE"`, no `httpStatus` |

`error.message` is PayPal's own text where PayPal sent one, otherwise a fixed summary. It is fine for a log; it is not wording for a shopper (*Presenting failures*, below).

## Branch on the issue code

`name` and `httpStatus` are coarse: `UNPROCESSABLE_ENTITY`/422 covers a declined card, an expired hold and an over-refund alike. Branch on the specific `issue` first, then fall back:

```js
const issues = (error.details ?? []).map(d => d.issue);
if (issues.includes("INSTRUMENT_DECLINED")) …
```

| Issue | Typically on | What to do |
| --- | --- | --- |
| `INSTRUMENT_DECLINED` | `createOrder` with a card, `authorizeOrder` | the card was refused: ask for another card; the next attempt needs a **new** `payPalRequestId` |
| `TRANSACTION_REFUSED` | authorize, capture | refused by PayPal: show the reason; a new attempt needs a new id |
| `AUTHORIZATION_EXPIRED` | `captureAuthorizedPayment` | the hold is past its 29-day validity and cannot be renewed — `reauthorizePayment` is refused too, so don't call it: tell the operator nothing was charged and the order needs a new payment. Renewal happens before capture, while the hold is still valid (`paypal-getting-started`, the authorization lifecycle) |
| `AUTHORIZATION_ALREADY_CAPTURED` | capture | already done: read the capture (`getOrder` → `payments.captures`) and record it — treat as success, not failure |
| `REFUND_AMOUNT_EXCEEDED` | `refundCapturedPayment` | more than remains: re-read what was refunded (`getCapturedPayment`) |
| `DUPLICATE_INVOICE_ID` | `createOrder`, capture | the `invoiceId` was used before: a reused id from your own records, or a repeat of a call that already landed — look before resubmitting |
| `RESOURCE_NOT_FOUND` (name) with 404 | any read | the only real "doesn't exist" |

Codes you have not listed get a **default arm**: show PayPal's `description` if the user can act on it, else a generic message, and log `debugId`. A business refusal can also arrive as **success**: an authorization `ok` with `status: "DENIED"` is a decline, a capture `ok` with `status: "DECLINED"` failed (`paypal-models`).

## `invalid_request` — nothing was sent

A request the gatekeeper refused before sending: a bug in your code or the caller's input (a card number with spaces, `value: 19.99` as a number, a 60-day search range, a `payPalRequestId` reused for a different request). Never retry it unchanged; fix the input. Nothing happened at PayPal, so there is nothing to settle and any claim can be released.

## Deployment-configuration errors

`NOT_CONFIGURED` and `AUTHENTICATION_FAILURE` — and a `401` or `403` from PayPal — are **the deployment's problem, not the caller's**: the administrator must set or fix the gatekeeper's PayPal credentials, or enable a feature on the PayPal app (Vault and Transaction Search are separate features; a `403` on those calls usually means one is off). Show a fixed message ("Payments aren't available right now"), never retry in a loop, and never blame the user's input. `AUTHENTICATION_FAILURE` can also be a passing outage of PayPal's token service: one later retry is reasonable.

## Unknown outcomes on writes

On a **write**, `network`, a 5xx, or `UNREADABLE_RESPONSE` means **nothing was learned about the request's fate**: PayPal may have acted. That is *unknown*, not *failed*. Settle it — re-read the resource, or repeat the write with the **same** `payPalRequestId` and the same request (PayPal deduplicates it) — before telling anyone anything (`paypal-resilience`, `paypal-integrate` 1b.1). On a **read**, the same errors are just "unavailable": the gatekeeper already retried it; don't stack another retry loop on top.

## `pending` and `declined`

- `pending`: the write was accepted but has not run (it waits for the user's approval, or auto-approval). Persist `actionId` with the operation it belongs to, show "processing", and call `getActionResult(actionId)` later; it returns the same envelope once decided. **Never repeat the call.**
- `declined`: the user did not allow the write. Nothing reached PayPal. Release the claim; a later attempt with the same id and request will be submitted again.

## What still throws

A call **rejects** (a plain `Error`: custom classes and properties do not survive RPC) only when the binding cannot be used — not attached to the Gadget, a method or field name that does not exist, a value of the wrong type — and `getActionResult` rejects for an unknown `actionId`. Keep a `try`/`catch` around every call for these, and never read an exception as "PayPal refused": PayPal refusals always arrive as values.

## A missing member is not an error

An `ok` answer can still lack the members you need, because every response member is optional. Assert on the ones you depend on, right after every call that matters: the order's `id`, the authorization's `id` and `status`, the capture's `id` and `sellerReceivableBreakdown`. For a write, an absent identifier has the same "outcome unknown" character as a lost answer — settle it by reading, never by assuming success or failure.

## Guard every call site

Check `kind` on every call, reads included — a read that silently returns `undefined` downstream is a bug that looks like a missing record. Convert results to your own answer **in one place** (one function in the Gadget's payments module), and return a plain, serializable object from `server.js`: error classes and `cause` chains do not survive the RPC hop to `client.js`.

```js
function toUserError(error) {
  const issue = error.details?.[0]?.issue;
  if (error.kind === "invalid_request") return { code: "invalid_input", message: "Please check the payment details." };
  if (error.name === "NOT_CONFIGURED" || error.name === "AUTHENTICATION_FAILURE" ||
      error.httpStatus === 401 || error.httpStatus === 403) return { code: "unavailable", message: "Payments aren't available right now." };
  if (issue === "INSTRUMENT_DECLINED") return { code: "card_declined", message: "Your card was declined. Try another card." };
  if (error.httpStatus === 429) return { code: "busy", message: "Too many requests — try again in a moment." };
  if (error.kind === "api" && error.httpStatus >= 400 && error.httpStatus < 500) {
    return { code: "refused", message: error.details?.[0]?.description ?? "PayPal refused this request." };
  }
  return { code: "unavailable", message: "Payments aren't available right now." };
}
```

(`network`, 5xx and `UNREADABLE_RESPONSE` on a write never reach this function: they go through the unknown-outcome settlement first.)

## Presenting failures to the user

- **Handle each failure kind the same way everywhere.** One mapping, used by every call site and by the pages and the JSON API alike.
- **Keep distinct failures distinct.** A declined card, an invalid input, an unavailable service and an unknown outcome are four different answers; collapsing them into one blanket "payment failed" hides what the user can do about it.
- **Not every PayPal failure is the caller's fault.** 401, 403, 429, `NOT_CONFIGURED`, `AUTHENTICATION_FAILURE` and 5xx are the deployment's or PayPal's problem: answer as a service error, not an input error. Unknown codes default to a service error, never to success.
- **Never turn a failed read into a domain absence.** A `getOrder` that failed is not "this order doesn't exist" — treating it so turns a passing outage into a duplicate `createOrder`.
- **Never put PayPal's raw `message` in front of a shopper.** Show your own wording, plus PayPal's `description` for issues the user can fix. **Logging the reason is not returning it**: log `debugId` and the issue **and** return the reason.
- **Never echo card details** — not in a message, a log line, or a stored error.

## Testing these paths

Use `payPalMockResponse` on a sandbox write to make PayPal answer with a chosen issue (`'{"mock_application_codes":"INSTRUMENT_DECLINED"}'`), and a fake `PAYPAL` object for everything else (`paypal-testing`). Assert on `kind`, `error.kind` and the issue code — never on the wording of `error.message`.

## Next

- **paypal-resilience** — settling unknown outcomes, `payPalRequestId`, polling `pending`.
- **paypal-calling-endpoints** — the request object and the envelope.
- **paypal-models** — statuses and optional members.
- **paypal-testing** — faking each path.
