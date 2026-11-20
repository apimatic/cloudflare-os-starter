---
name: paypal-getting-started
description: "Load before any PayPal work in this workspace — a Gadget or executeCode code that creates orders, holds (authorizes) card payments, captures, voids, refunds, saves cards or searches transactions — and before answering any question about what PayPal can do here. The lookup layer for the PAYPAL binding: what it offers and doesn't, attaching it to a Gadget, reading its API with describeBinding, the result envelope, payPalRequestId, card-data rules, sandbox only."
---

# Getting started with PayPal in Cloudflare OS

> **The lookup layer** for PayPal work here: ground every contract fact in what `describeBinding` returns for the `PAYPAL` binding — never in recall, and never in PayPal's public REST docs — and carry those facts onto a contract sheet before you implement. `paypal-integrate` holds the workflow around it.

Gadgets and `executeCode` cannot reach the internet, so they cannot call PayPal or load a PayPal SDK. PayPal is reached through **one binding, `PAYPAL`**, provided by a gatekeeper that holds this deployment's PayPal credentials, calls the PayPal Server SDK on your behalf, records every call, and returns the result. The companion skills — `paypal-calling-endpoints`, `paypal-models`, `paypal-error-handling`, `paypal-resilience` and `paypal-testing` — are the *usage layer*: how to call it and the gotchas a signature cannot show. **Load both:** at each **Integration workflow** step, load the companion it names.

## Binding identity

| Fact | Value |
| --- | --- |
| Binding | `PAYPAL` in your `executeCode` env (it is provided to you automatically); `this.env.PAYPAL` inside a Gadget's `server.js` once attached |
| Attach it to a Gadget | `setGadgetBinding({ gadget: "<GADGET_BINDING>", source: "PAYPAL" })` — a Gadget sees only the bindings wired to it |
| Where it can be called | `executeCode` and a Gadget's `server.js`. **Never `client.js`**: the browser side has no `env`; it asks its own server over RPC |
| API declaration | `describeBinding` on `PAYPAL` returns the full TypeScript declaration (`PayPalSandbox` and every model) with doc comments. It is the only contract |
| Environment | **PayPal sandbox only.** No setting selects live PayPal; no real money moves |
| Credentials | Held by the gatekeeper. Never put a PayPal client id, secret or access token in code |
| Call shape | `await PAYPAL.<operation>(request)` — one flat request object, results never thrown (*Results*, below) |
| Names | Operation, field and model names are the PayPal Server SDK's camelCase names (`purchaseUnits`, `currencyCode`, `payPalRequestId`) — never PayPal's snake_case wire names (`purchase_units`, `currency_code`) |
| Values | Plain JSON values: objects, arrays, strings, numbers, booleans. Money is `{ currencyCode, value }` with `value` a **decimal string**; timestamps are RFC 3339 strings |
| Notifications | None: there are no webhooks and nothing calls a Gadget when PayPal state changes. Learn the state of an order, hold, capture or refund by reading it |

Gadget code is plain JavaScript with no compiler, so nothing checks your field names before run time. The declaration from `describeBinding` is the contract: compare every method and field name you write against it by hand, and treat a rejected call or an `invalid_request` result as the type error you would otherwise have had from a compiler.

## What the binding offers — and what it does not

| Group | Operations |
| --- | --- |
| Orders | `createOrder`, `authorizeOrder`, `getOrder` |
| Authorizations, captures, refunds | `getAuthorizedPayment`, `captureAuthorizedPayment`, `reauthorizePayment`, `voidPayment`, `getCapturedPayment`, `refundCapturedPayment`, `getRefund` |
| Saved cards (vault) | `createPaymentToken`, `listCustomerPaymentTokens`, `getPaymentToken`, `deletePaymentToken` |
| Reporting | `searchTransactions` |
| Pending calls | `getActionResult(actionId)` |

**Not available:** capturing an order directly (`captureOrder` — so `intent: "CAPTURE"` works only with a card at creation), confirming, patching or tracking orders, listing or searching orders, setup tokens / 3-D Secure, subscriptions and billing plans, balances, webhooks, PayPal-wallet (non-card) checkout, payouts. If a task needs one of these, it is a **Blocker** (`paypal-integrate`), not something to work around with `fetch`.

## Results — nothing is thrown for a PayPal failure

Every operation resolves to an envelope; check `kind` before reading `value`:

| `kind` | Meaning |
| --- | --- |
| `"ok"` | PayPal answered with success: `httpStatus` and `value` (the SDK model). `ok` is not business success — a card hold can come back `ok` with authorization `status: "DENIED"` |
| `"error"` | `error: { kind, httpStatus?, name?, message, debugId?, details? }` — `paypal-error-handling` |
| `"pending"` (writes only) | Accepted, not yet carried out: keep `actionId`, show "processing", call `getActionResult(actionId)` later. **Never repeat the call** |
| `"declined"` (writes only) | The user did not allow the call. Nothing was sent to PayPal |

A call still **rejects** (a plain `Error`, message only) when the binding itself is unusable — not attached to the Gadget, a misspelled method or field, a value of the wrong type — and `getActionResult` rejects for an unknown `actionId`. Keep a `try`/`catch` around every call for those.

## Writes, approvals and `payPalRequestId`

Every call that changes something at PayPal (create, authorize, capture, reauthorize, void, refund, save or delete a card) goes through this workspace's action log. When the user has switched on auto-approval for **"PayPal sandbox payments"**, the call runs a moment later and the binding returns PayPal's answer directly (it waits up to 25 seconds); otherwise it returns `pending`. In `executeCode`, a `pending` result means: return from `executeCode` so the approval can appear, and check `getActionResult` after the next turn starts.

Every money-moving or card-saving write requires `payPalRequestId` (1–108 printable characters, no spaces). It is the idempotency key **and** the only one that spans calls:

- Derive it from your own record — `shop-order-${orderId}-authorize-1` — never from a value made per attempt (`crypto.randomUUID()` per call deduplicates nothing).
- Same id + same request → the stored outcome, without acting again. A PayPal answer (success or refusal) is final for its id: a corrected retry (another card, a new amount) needs a new id (`…-authorize-2`).
- An outcome that is unknown or never reached PayPal (`declined`, a `network` error, a 5xx, `UNREADABLE_RESPONSE`, `NOT_CONFIGURED`, `AUTHENTICATION_FAILURE`) is sent again when repeated with the same id and request.
- Same id + a different request → `invalid_request`. A second partial refund, a retry with another card and a new payment after an expired hold each need their own id.
- Ids are shared by every Gadget and chat in the workspace and remembered for good: prefix them with the app's name and a store id that changes whenever the store's data is wiped.

`paypal-resilience` has the full rules and the reconciliation reads.

## Contract facts — where each one comes from

| Question | Where |
| --- | --- |
| A method's request fields, required (`f: T`) vs optional (`f?: T`) | `describeBinding` → the method's request type |
| A model's members, enum values | `describeBinding` → the model's `interface`/`type` |
| What a method *means* (e.g. "Returns a NEW authorization: capture that one") | The doc comment above it in the declaration |
| Values a plain-`string` field accepts (`transactionStatus`, `payPalMockResponse`, `storeInVault`) | The doc comment; otherwise mark the fact **UNVERIFIED** and say what would settle it |
| Whether a call works with this deployment's PayPal app | A smoke run from `executeCode` (`paypal-integrate`, Step 1) |

Keep lookups cheap: call `describeBinding` **once**, collect the contracts for **every** in-scope operation into a short **contract sheet** in your plan, and implement from the sheet. Never re-look-up a fact the sheet already carries. Recurse into a model's members only where the task sets or reads them. If a call is rejected or answers `invalid_request` on a name or shape, re-read the declaration before a second self-fix: rewriting from the same knowledge that produced the error is guessing.

## Checks made before anything is sent

The gatekeeper refuses these with `{ kind: "error", error: { kind: "invalid_request", message } }`, and nothing reaches PayPal:

- ids: letters, digits, `-`, `_`; `customerId` at most 22 characters.
- `payPalRequestId`: 1–108 printable characters, no spaces; not already used for a different request.
- `Money`: `currencyCode` three capital letters; `value` a decimal string, at most 10 digits before the point and 3 after.
- card: either `vaultId` or `number` (13–19 digits, no spaces) + `expiry` (`"YYYY-MM"`) + optional `securityCode` (3–4 digits) — never both.
- `createOrder`: 1–10 purchase units; `intent: "CAPTURE"` only with `paymentSource.card`.
- `searchTransactions`: RFC 3339 dates with seconds and an offset (`"2026-11-01T00:00:00Z"`), at most 31 days apart; `pageSize` ≤ 500. `listCustomerPaymentTokens`: `pageSize` ≤ 100.

What is **not** checked here, PayPal refuses: a reused `invoiceId`, over-long texts, decimals a currency does not allow, a refund larger than what remains.

## Sensitive data

`CardRequest` carries the raw card `number` and `securityCode`. They go to PayPal and nowhere else:

- Collect them in `client.js`, pass them to `server.js` in one RPC call, and from there straight into the `PAYPAL` call. Never store them (Durable Object KV or SQLite), log them, put them on a claim row, return them to `client.js`, or echo them in an error message.
- What you keep is what PayPal returns: `lastDigits`, `brand`, `expiry`, and the saved card's token id (`vaultId` / `paymentSource.card.attributes.vault.id`). Responses never carry the full number.
- `error.message` and `details` never contain card details; `error.debugId` is the value to log for support.
- In `executeCode`, use sandbox test card numbers only.

## Integration workflow — load the companion skill at each step

1. **Plan** — `paypal-integrate`, always first for implementation work.
2. **Attach and read the API** — `setGadgetBinding`, then `describeBinding` on `PAYPAL`.
3. **Calling an operation** — load **paypal-calling-endpoints** before the first `PAYPAL.<operation>(…)` call.
4. **Models** — load **paypal-models** the moment a request or response member is not a plain string or number (money, dates, statuses, nested optional fields).
5. **Results and errors** — load **paypal-error-handling** before you write the code that reads a result.
6. **Idempotency, unknown outcomes, pending, paging** — load **paypal-resilience** before the first write and before any loop over pages.
7. **Testing** — load **paypal-testing** before you verify anything.

## What a contract sheet must carry for PayPal here

Each of these is a decision the implementer cannot make correctly from a signature alone.

1. **Every request field the task sets**, required or optional, as the declaration names it, and which optional fields stay out (`paypal-integrate` 1b.3).
2. **The `payPalRequestId` of every write**: what it is derived from, how a retry after a final refusal gets a new one, and its app prefix.
3. **Optional vs required for every model member the code reads** — every response field is optional; say what the code does when one is absent.
4. **For each operation, the `details[].issue` codes the code branches on** (`INSTRUMENT_DECLINED`, `AUTHORIZATION_EXPIRED`, `AUTHORIZATION_ALREADY_CAPTURED`, `REFUND_AMOUNT_EXCEEDED`, `DUPLICATE_INVOICE_ID`, `TRANSACTION_REFUSED`, …), and the fallback for codes it does not know.
5. **Where business status lives**: `purchaseUnits[0].payments.authorizations[0].status` (`"CREATED"` held vs `"DENIED"` declined); capture `status`; refund `status` — each an open enum with a default arm.
6. **The authorization lifecycle, decided at capture time from the hold's `createTime` and `expirationTime`**: inside the 3-day honor period, capture it. After the honor period and before `expirationTime` (29 days), call `reauthorizePayment` first and capture the **new** authorization id it returns; if the renewal is refused, capture the original id, which is still valid. At or after `expirationTime` nothing renews the hold — a capture fails with `AUTHORIZATION_EXPIRED` and a reauthorization is refused — so the order needs a new payment. Whether card holds accept `reauthorizePayment` is **UNVERIFIED**; the refused-renewal arm covers either answer.
7. **What each write does on `pending` and `declined`**.
8. **Which outcomes are unknown** and the read that settles each (`paypal-resilience`).
9. **That no operation pages for you**: `searchTransactions` and `listCustomerPaymentTokens` return one page per call, walked by hand with a bound of your own.
10. **`customer.id` vs your own shopper id**: saved cards are listed by PayPal's customer id, which your app stores per shopper.
11. A **REQUIRED READING** block naming the `paypal-*` companions, with inline `MUST load` pointers.
