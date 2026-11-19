---
name: paypal-resilience
description: "Load before writing Gadget or executeCode code that moves money or saves cards through PAYPAL, calls it more than once for the same thing, or loops over pages: choosing payPalRequestId keys, what a repeat returns, settling unknown outcomes by reading state, polling pending writes with getActionResult, bounding page walks over searchTransactions / listCustomerPaymentTokens and the 31-day window, and how long calls can take."
---

# Resilience: idempotency, unknown outcomes, pending writes and page walks

The gatekeeper behind `PAYPAL` owns everything a client would normally configure: credentials and access tokens, retries, timeouts, the sandbox-only address, and the request headers. You cannot pass per-call options — no signal, timeout, retry or headers. What *is* yours: choosing idempotency keys, deciding what to do with an outcome you did not learn, waiting for pending writes, and bounding loops.

## What the gatekeeper already does

| | Behaviour |
| --- | --- |
| Reads (GET) | retried up to 2 more times on 408, 429, 500, 502, 503, 504 or a connection/timeout fault; 30 s per attempt; backoff about 1 s then 2 s, honouring `Retry-After` |
| Writes | sent to PayPal **once**, 30 s timeout, after approval |
| Write answer | the binding waits up to **25 s** for the write to be approved and run, then answers `pending` |
| First call | may also fetch an access token |

So one read can take well over a minute in a bad moment, and a write in a request handler can take ~25 s before answering `pending`. **Do not stack a second retry layer** on reads: attempts multiply. At most one later retry of a read that came back `network`, never a loop.

## Making a write safe to repeat

"It was not resent" is not "the write did not happen", and a write that timed out may have succeeded. The tool is `payPalRequestId`:

- **Key it on something you already hold** — a reference derived deterministically from your own record (`shop-order-${orderId}-capture-${attempt}`), stored on the claim row before the call. **A key generated inside the code that retries (`crypto.randomUUID()` per call) is a fresh key on every attempt, which deduplicates nothing while looking exactly like a solution.**
- **Prefix it with the app's name**: keys are shared by every Gadget and chat in the workspace.
- 1–108 printable characters, no spaces.

What a repeat returns, per outcome (same `payPalRequestId`, same operation):

| First outcome | Repeat with the same request | What to do |
| --- | --- | --- |
| `ok` | the same `ok` result, without acting again | done — use it |
| `error`, `invalid_request` | evaluated again (nothing was stored) | fix the request |
| `error`, `api` with a 4xx (`INSTRUMENT_DECLINED`, `REFUND_AMOUNT_EXCEEDED`, …) | the same error — final for this key | branch on the issue; a corrected attempt needs a **new** key (`…-authorize-2`) |
| `error`, `network`; `api` with 5xx or `UNREADABLE_RESPONSE` | **sent again**; PayPal returns the original result if the first attempt landed | the safe way to settle — or read state first (below) |
| `error`, `NOT_CONFIGURED` / `AUTHENTICATION_FAILURE` | sent again | wait for the deployment to be fixed; don't loop |
| `pending` | waits for the same action again | don't repeat — poll `getActionResult(actionId)` |
| `declined` | submitted again for approval | only if the user asks again |

**Same key, different request** (another amount, another card) is refused as `invalid_request` — so every distinct request gets its own key: two partial refunds of one capture are `refund-${captureId}-1` and `refund-${captureId}-2`, with the counter kept in your records. A test key reused in production returns the test's outcome: test runs use keys of their own.

PayPal itself remembers ids for 6 hours (orders), 45 days (payments) and 3 hours (vault tokens); the workspace remembers them for good.

## Unknown outcomes — settle by reading

A failed send on a write — `network`, a 5xx, `UNREADABLE_RESPONSE`, or an `ok` missing the id you need — is an **unknown outcome**, not a failure. Reconcile before reporting:

| Write | Read that settles it |
| --- | --- |
| `authorizeOrder` | `getOrder({ id })` → `purchaseUnits[0].payments.authorizations` |
| `captureAuthorizedPayment` | `getAuthorizedPayment` → `CAPTURED` / `PARTIALLY_CAPTURED`; `getOrder` → `payments.captures` for the capture id |
| `voidPayment` | `getAuthorizedPayment` → `VOIDED` |
| `reauthorizePayment` | `getOrder` → the authorizations (the new id) |
| `refundCapturedPayment` | `getCapturedPayment` → `REFUNDED` / `PARTIALLY_REFUNDED`; `getOrder` → `payments.refunds` |
| `createPaymentToken` | `listCustomerPaymentTokens` (needs the `customer.id` you sent) |
| `deletePaymentToken` | `getPaymentToken` → `RESOURCE_NOT_FOUND` |
| `createOrder` | nothing reads an order you have no id for — repeat with the same key; set `customId` / `invoiceId` so a later `searchTransactions` (up to 3 h delay) can match a paid one |

Found → settle from what PayPal holds. Not found, or the read failed too → still unknown: keep the claim, repeat with the same key later, or tell the operator it is unknown. Never "failed".

## Pending writes

`pending` is known-not-yet-run. Record `actionId` with the operation it belongs to on the claim row, answer "processing", and check later:

- In a Gadget, check on a bounded schedule (e.g. when the page next loads, or every few seconds for a minute, then stop and offer "check again"). `getActionResult` answers at once; it never waits.
- In `executeCode`, return from `executeCode` so the approval can appear, then call `getActionResult` after the next turn starts.
- A write that stays `pending` means auto-approval of "PayPal sandbox payments" is off and nobody approved it.

## Page walks

No operation pages for you, and **every page walk needs at least one bound that does not depend on PayPal**:

- **A page cap** of your own (e.g. 50 pages), and a time budget — each page is a call that can take a while.
- **Stop on** `page >= totalPages`, or an empty page. `listCustomerPaymentTokens` returns `totalPages` only with `totalRequired: true`; without it, stop on a page shorter than `pageSize`.
- **Narrow the query before you page it**: `transactionId`, `transactionStatus`, `transactionCurrency`, a tighter date range. Use the largest page size allowed (500 for transactions, 100 for saved cards).
- **`searchTransactions` covers at most 31 days per call.** Split a longer range into consecutive windows, walk each one fully, and de-duplicate by `transactionId`.
- **Never return a partial set that reads like a complete one.** A walk that hit its cap, or a page that failed, returns `complete: false` and says why; a reconciliation over an incomplete set must say it is incomplete.
- New transactions can take **up to 3 hours** to appear (`lastRefreshedDatetime` on each answer says how current the data is).

```js
function windows(startIso, endIso, maxDays = 31) {
  const out = [];
  const step = maxDays * 24 * 60 * 60 * 1000 - 1000;
  for (let from = Date.parse(startIso), end = Date.parse(endIso); from <= end; from += step + 1000) {
    out.push([new Date(from).toISOString(), new Date(Math.min(from + step, end)).toISOString()]);
  }
  return out;
}
```

## Bounding the total wait

Several calls in one handler add up: an operator's "fulfil" that reads the hold, reauthorizes, then captures is up to three calls, each of which may wait. Give the total one home — the payments module — and decide there what the handler answers when it runs long (usually "processing", with the claim row carrying what to check next). Run calls one after another rather than in a large `Promise.all`; there is no rate limiter in front of PayPal, and retrying into a rate limit turns a fast failure into a slow one.

## By symptom

| Symptom | Cause |
| --- | --- |
| a second partial refund is refused as `invalid_request` | the key was reused for a different amount — each refund gets its own |
| a retry after a decline returns the same decline | a PayPal refusal is final for its key — new attempt, new key |
| a write answered `pending` after ~25 s | expected without auto-approval — poll `getActionResult` |
| `pending` forever | auto-approval of "PayPal sandbox payments" is off |
| `invalid_request` mentioning 31 days | split the range into windows |
| a fresh payment is missing from `searchTransactions` | the up-to-3-hour delay |
| a mock error comes back in a real run | a key reused from a test run |
| `NOT_CONFIGURED` / `AUTHENTICATION_FAILURE` | the deployment's PayPal credentials |

## Next

- **paypal-error-handling** — what each error means and what to show.
- **paypal-testing** — exercising these paths.
- **paypal-calling-endpoints** — the request and the envelope.
