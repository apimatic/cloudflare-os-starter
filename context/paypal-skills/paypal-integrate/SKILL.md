---
name: paypal-integrate
description: "MANDATORY FIRST STEP before building or changing a Gadget or executeCode code that calls the PAYPAL binding — orders, card holds (authorize), captures, voids, reauthorizations, refunds, saved cards, transaction search or reconciliation — and when a PAYPAL call returns an unexpected error, pending or declined result. Sets the plan-first workflow, the contract sheet and which companion skills to load."
---

# PayPal — Integration workflow (lookup layer + contract sheet)

## Your lookup layer

- **`paypal-getting-started`** is the entry point for every PayPal need: what the `PAYPAL` binding offers and doesn't, attaching it, the result envelope, `payPalRequestId`, the checks made before sending, card-data rules. Load it first, always.
- **`describeBinding` on `PAYPAL` is your lookup surface.** It returns the binding's complete TypeScript declaration with doc comments: every method, request field and model. It is the ground truth; a skill page is not. If a fact is not there, mark it **UNVERIFIED** and say what would settle it.
- **Write a contract sheet with no open lookups** before you implement: each operation's request fields (required vs optional), the `payPalRequestId` each write sends, the response members the code reads, the `details[].issue` codes each operation's handling branches on, which lists are walked page by page and the bound each walk takes, and the status values the code switches on. `paypal-getting-started` ends with a checklist of what a sheet is incomplete without — treat that as the checklist for your own sheet, and collect every in-scope operation in ONE pass rather than re-reading the declaration per field.

## Workflow

**If the user opens with a failing PayPal call or unexpected behaviour** (not new feature work), skip the plan-first flow: load `paypal-getting-started` and `paypal-error-handling`, re-read the failing method and fields in the declaration, and triage:

| Symptom | Meaning |
| --- | --- |
| the call rejects (an exception) | the binding is not attached to the Gadget (`setGadgetBinding`), or a method or field name does not exist, or a value has the wrong type |
| `error.kind: "invalid_request"` | refused before sending: fix the request (`error.message` says what) |
| `error.name: "NOT_CONFIGURED"` / `"AUTHENTICATION_FAILURE"` | deployment configuration, for the administrator — not a code bug |
| `kind: "pending"` that never resolves | auto-approval of "PayPal sandbox payments" is off and nobody approved it |
| `kind: "declined"` | the user refused the call; nothing reached PayPal |
| the same failure on every retry | the retry reused a `payPalRequestId` whose outcome is final (`paypal-resilience`) |

Otherwise, for implementation work:

### Step 1 — Plan first (always, for any implementation work)

You write the plan yourself, in the conversation (or in a file of the Gadget if the user wants it kept), before any Gadget file is created or edited. Load `paypal-getting-started` and `paypal-error-handling`, then work through the user's full request — all features in scope; one plan covers the whole implementation. The plan is complete when it holds the plan, its contract sheet and every table in *Step 1b*, and it ends with a one-paragraph summary and an **Assumptions & Blockers** section, which you show the user before building.

**Do these read-only steps first:**

- **Attach and read**: if the Gadget exists, check its bindings; plan the `setGadgetBinding({ gadget, source: "PAYPAL" })` call; call `describeBinding` on `PAYPAL` once and take the contracts from it.
- **Survey what exists**: does the Gadget already exist, what is in its `server.js` and `client.js`, what does it already store (Durable Object KV or SQLite) and how. Read existing code only where a table needs it — for example, where the Gadget already keeps the records a claim belongs on. Capture each convention as *pattern + the one file to imitate*, not pasted code.
- **Smoke each in-scope read** from `executeCode` with real values (or, where none exist yet, a harmless one such as `getOrder({ id: "NONEXISTENT" })`, which should answer `RESOURCE_NOT_FOUND`). This surfaces `NOT_CONFIGURED`, `AUTHENTICATION_FAILURE`, and features the deployment's PayPal app lacks (Vault and Transaction Search must be enabled on it; a `403` here says one is not) before you build on them. A read that fails here reorders the plan rather than the build: revise the sheet and say so in Assumptions & Blockers.
- **Smoke writes only deliberately**: each write is logged and may need the user's approval; in `executeCode` expect `pending` unless auto-approval is on, and then return and check `getActionResult` next turn. Exercise failure paths with `payPalMockResponse` (`paypal-testing`), never against real records.

**HARD GATE — no Gadget file is created or edited until** the plan exists, its contract sheet has **no open lookups**, and you have shown its Assumptions & Blockers to the user. Creating or editing ANY Gadget file before then is a defect, however obvious the code seems. Attaching the binding and the read-only steps above are allowed meanwhile.

### Step 1b — The tables the contract sheet must carry (fill these in before you write any code)

The per-operation rows describe **what each operation is**. The tables below carry what those rows cannot: a write that may reach PayPal twice or whose outcome you may not learn, a rule that spans two operations, and a field nobody asked for. Fill in every one that applies.

#### 1b.1 — DURABLE WRITES

One row in each table below per operation in scope that creates, sends or changes something at PayPal; `none` if the scope has no such write. Every row follows one order: **claim → binding call → record the result**. The claim is a row of its own, committed to the Gadget's own storage *before* the call — not a field filled in afterwards on the record the write is about — so a second caller is stopped before it reaches PayPal, and a lost answer leaves something to settle.

**DUPLICATE CLAIMS** — what stops the same operation reaching PayPal twice.

| Write | Where the claim is stored | What rejects the second one | Where that rejection is handled | Where in the code |
| --- | --- | --- | --- | --- |

⚠⚠ **What rejects the second one**: the store refusing the second claim — a unique constraint or a conditional write on a value every caller doing the same operation computes the same (the order being paid, the refund being issued), never on a value minted per attempt, which is unique by construction and refuses nothing. A read before the write, an in-memory lock, or an assumption that one request runs at a time lets both callers through: a Durable Object runs one event at a time but **yields at every `await`**, so the claim must be a single synchronous conditional write before the first `await this.env.PAYPAL…` — in SQLite, `INSERT … ON CONFLICT DO NOTHING` and check `rowsWritten`. Release the claim when PayPal definitively refuses the call or the user declines it, so a later attempt is not blocked.

**Where that rejection is handled**: the branch for `rowsWritten === 0`; the losing caller then uses the record the winner wrote (its stored result, or "already processing").

**`payPalRequestId` goes on the claim row and on every write.** It is the idempotency key PayPal and the gatekeeper both honour, derived from the claimed record plus an attempt counter stored on the claim (`shop-order-${orderId}-authorize-${attempt}`) and prefixed with the app's name. Repeating a write with the same id and request returns its stored outcome; a final PayPal answer (success or refusal) stays final for that id, and the id stays bound to the request first sent under it. So the attempt increments whenever the action runs again after a final answer (a decline, paying again after an expired hold) or with a different request (another card); the counter is kept on your own record and never goes back down when a claim is deleted. `paypal-resilience` has the full rules.

**UNKNOWN OUTCOMES** — what settles a write PayPal may have acted on without your code learning the answer.

| Write | The operation you re-read with | The reference you search by | Where in the code | The test that fails the connection |
| --- | --- | --- | --- | --- |

⚠⚠ A write whose result is `error.kind: "network"`, an `"api"` error with `httpStatus` ≥ 500, or `name: "UNREADABLE_RESPONSE"` is *unknown*, not *failed*: PayPal may already have acted. Reporting a failure is not a legal entry, and neither is leaving the caller to check or retry. Settle it in that write's own handling: re-read by the reference you hold — found, settle from what PayPal holds; not found, or the re-read itself fails, still unknown, never failed — or repeat the write with the **same** `payPalRequestId` and the same request, which PayPal deduplicates. Telling the caller the outcome is unknown comes after that, never instead of it. If PayPal offers no way to find the write, that is a **Blocker** in Assumptions & Blockers, not a row.

The re-reads available here:

| Write | Re-read with |
| --- | --- |
| `authorizeOrder` | `getOrder({ id })` → `purchaseUnits[0].payments.authorizations` |
| `captureAuthorizedPayment` | `getAuthorizedPayment` (status `CAPTURED` / `PARTIALLY_CAPTURED`), or `getOrder` → `payments.captures` for the capture id |
| `refundCapturedPayment` | `getCapturedPayment` (status `REFUNDED` / `PARTIALLY_REFUNDED`), or `getOrder` → `payments.refunds` |
| `voidPayment` | `getAuthorizedPayment` → `VOIDED` |
| `reauthorizePayment` | `getOrder` authorizations (the new id) — or repeat with the same `payPalRequestId` |
| `createPaymentToken` | `listCustomerPaymentTokens`, only when `customer.id` was sent — otherwise repeat with the same `payPalRequestId` |
| `createOrder` | no read finds an order you have no id for: repeat with the same `payPalRequestId`; an unpaid order is harmless to recreate |
| `deletePaymentToken` | `getPaymentToken` (`RESOURCE_NOT_FOUND` = deleted) |

`searchTransactions` can match a payment by `invoiceId` or `customField`, but only after up to 3 hours — never a settling read for a request in flight.

**`pending` is not unknown.** It is known-not-yet-run: record the `actionId` on the claim row, show "processing", and call `getActionResult(actionId)` later; never repeat the write. **Never sent** — `invalid_request`, `declined`, `NOT_CONFIGURED`, `AUTHENTICATION_FAILURE` — has nothing to re-read and gets its own outcome (release the claim). **The test that fails the connection** asserts the re-read (or same-id repeat) was made; a second test, a never-sent failure on the same write, asserts it was not.

Write `TBD` in **Where in the code** and **The test that fails the connection** while you plan — every row. Once the code exists, replace each `TBD` individually: the claim write, then the binding call it precedes; the unknown-outcome branch, then the re-read it makes. ⚠⚠ A `TBD` left behind, a name that is not in the code, or one note covering several rows is **not addressed**; if the code does not do what the row says, fix the code, then the cell.

#### 1b.2 — CROSS-OPERATION INVARIANTS

**CROSS-OPERATION INVARIANTS** — copy this header into the contract sheet and add one row per value a caller supplies (an identifier, a code, a reference) whose legal set something other than that call defines: a list PayPal returns, or records this application keeps. `none` if the task restricts no such value. ⚠⚠ The declaration never states these rules; derive them from the task.

| Invariant | Where the legal set comes from | Enforced where | The test that proves it |
| --- | --- | --- | --- |

⚠⚠ **The legal set is the one this task offers, not everything the account holds.** Asking PayPal whether a value exists is not this check: PayPal already rejects what exists nowhere, so a lookup of one record by its id enforces nothing new — every shopper's saved cards, test records and other apps' orders all exist in this shared sandbox account, and all pass it. Check membership of the offered set itself, read in full (every page). Typical rows here: a `paymentMethodId`/`vaultId` a shopper supplies must be one of **that shopper's** saved cards (your own records, or `listCustomerPaymentTokens` for the shopper's stored PayPal `customer.id`); an order, authorization or capture id must belong to an order this Gadget created and the caller may act on. If neither PayPal nor this application can name that set, that is a **Blocker** in Assumptions & Blockers, not a row.

The check runs before the write is attempted and before its **DUPLICATE CLAIMS** claim is inserted — a value rejected after the claim exists leaves the claim behind to block a later, legitimate attempt. **The test that proves it** asserts a value outside the set is rejected **and** the binding is never called.

#### 1b.3 — OPTIONAL REQUEST FIELDS

For every write operation in scope, the contract sheet carries an **OPTIONAL FIELDS** table: one row per optional field on the request, and what **requires** it.

| Field | What requires it | Set it? |
| --- | --- | --- |
| `{optionalField}` | nothing | ❌ leave it out |
| `{optionalField}` | the words in the task that supply it | ✅ set it from those words |
| `{optionalField}` | a named row of this sheet — e.g. the reference an UNKNOWN OUTCOMES row searches by | ✅ set it, and name that row here |

The optional fields on this binding's writes: `invoiceId` (PayPal refuses a reused one: `DUPLICATE_INVOICE_ID`), `customId`, `referenceId`, `description`, `paymentSource.card.attributes.vault.storeInVault`, `attributes.customer.id`, `finalCapture` (absent = `true`, which releases the rest of the hold), `body.amount` on capture, reauthorize and refund (absent = the full amount / everything not yet refunded), `noteToPayer`, `payPalMockResponse` (tests only — never in shipped code).

⚠⚠ **A field nothing requires is not yours to choose** — and "something requires it" means the task's own words or a row of this sheet, never your own sense that it looks sensible. Leaving it out *is* the decision: PayPal's own default then applies, and it is not yours to replace with a value you invented.

⚠⚠ **This rule never removes a field another row requires.** The reference you look an unknown outcome up by is required by the UNKNOWN OUTCOMES row rather than by the task — the task will never mention it. Dropping it to satisfy this table is a defect, not compliance. (`payPalRequestId` is required by the binding itself on every money-moving write.)

⚠⚠ **The declaration does not state every default, and its silence is not permission to pick one.** A member typed `field?: T` tells you the field may be omitted. Unless its doc comment says what omitting it does, that is a reason to leave it absent, not a reason to fill it.

**The test that proves it:** with a fake `PAYPAL` (`paypal-testing`), assert the request object your code passed carries **no key your own code set without a row that requires it**. A test that only checks the fields you meant to send cannot see an invented one.

#### 1b.4 — WHEN THE API SAYS NO

Add one table per operation that uses the caller's data — what they typed (card details, amounts), ids they supply, and data your app stores for them. When PayPal refuses the data you sent for them, only its reason tells them what to change. "Your Gadget answers" means what `server.js` returns to `client.js` (and to any JSON caller), as a plain object.

| Result | your Gadget answers | the caller reads | test |
| --- | --- | --- | --- |
| `invalid_request` | a request error | your own wording, informed by `error.message` | send a malformed card number; assert the message and that nothing was stored |
| `api`, a `4xx` other than 401 / 403 / 429 | a request error | PayPal's reason: `details[0].description` (or your wording for a known `issue`, e.g. `INSTRUMENT_DECLINED` → "Your card was declined — try another card") | `payPalMockResponse` or a fake with the issue; assert the reason is in your answer |
| `NOT_CONFIGURED`, `AUTHENTICATION_FAILURE`, 401 / 403 | a service error | a fixed message — payments are not set up / unavailable here | fake it; assert the fixed message |
| 429 | a service error | a fixed message — try again shortly | — |
| 5xx, `network`, `UNREADABLE_RESPONSE` on a write | per UNKNOWN OUTCOMES | unknown — never "failed" | — |
| 5xx, `network` on a read | a service error | a fixed message, with `debugId` logged | — |
| `pending` | an accepted state | "processing" | — |
| `declined` | an accepted refusal | "this payment was not approved" | — |
| the call rejects | a service error | a fixed message | — |

Logging the reason is not returning it: log it **and** put it in the answer. Never put card details in either.

### Step 1c — Required reading (do this before you write any code)

End the contract sheet with a **REQUIRED READING** block whose rows carry inline `MUST load <skill>` pointers. **Load every `paypal-*` skill the sheet names, now, before you start implementing** — not lazily at the step that needs it. The sheet deliberately does *not* carry the how-to: it names the hazard and hands you the skill that resolves it, so an unloaded pointer is a gap in what you know, not a formality.

**A fixed floor applies regardless of what the sheet says** — the sheet can add to it, never remove from it: `paypal-error-handling` always (every integration writes result handling); `paypal-resilience` before the first write or page loop; `paypal-testing` before the first test or verification run, *including* a throwaway check in `executeCode`.

Before implementing, check the plan's **Assumptions & Blockers** section:

- Blocker or major assumption → surface it to the user in plain language, get their answer, and revise the plan in place with targeted edits — change the affected rows, append a section; never rewrite the whole plan to change a few rows — and restate only the changed rows.
- Minor assumptions only → proceed.

Full re-planning only on genuine scope change; for a single missing fact mid-implementation, do the lookup, never guess.

### Step 2 — Implement from the contract sheet

1. Treat the sheet's contracts as authoritative. When a lookup revises a row, update the sheet so the sheet and the code never disagree.
2. Attach the binding (`setGadgetBinding({ gadget, source: "PAYPAL" })`) before writing code that uses `this.env.PAYPAL`.
3. **Keep PayPal calls in one module of the Gadget's server** (e.g. `payments.js`) whose functions take the binding as a parameter (`authorize(paypal, storage, input)`); `server.js` passes `this.env.PAYPAL`. One place maps results to your own answers, and tests can pass a fake (`paypal-testing`).
4. **Check `kind` before `value`, on every call — reads too.** Every response member is optional: assert the ones you depend on (`value.id`, the authorization's `id` and `status`) right after the call; for a write, a missing id has the same "outcome unknown" character as a lost answer.
5. Implement sequentially, following the Gadget's own conventions and the companion skill that governs each step.
6. **After every change, re-check names by hand**: compare every method and field name you wrote against the declaration — there is no compiler. Then exercise the code: call the Gadget's server methods from `executeCode` (`env.<GADGET>.rpc.<method>(…)`) against a fake binding first, then the sandbox (`paypal-testing`).
7. **Any rejected call or `invalid_request` naming a field or value** → go back to the declaration and read the one type that owns the fact. Do not attempt more than one self-fix before doing that lookup: rewriting from the same knowledge that produced the error is guessing.
8. Once the code is complete, open each member the **DUPLICATE CLAIMS** and **UNKNOWN OUTCOMES** rows name and confirm it runs when that write runs. Where the code falls short of a row, fix the code, not the row.
9. **Observability and sensitive data.** The gatekeeper records every PayPal call; your code logs what it decided, with `error.debugId`, and never card details (`paypal-getting-started` → *Sensitive data*).
10. **Retries are not yours to add on writes.** The gatekeeper retries reads; a write is repeated only per UNKNOWN OUTCOMES, with the same `payPalRequestId` (`paypal-resilience`).

### Step 3 — Answering pure questions

A standalone PayPal question with no code change: look it up in `paypal-getting-started` and the declaration from `describeBinding`, then give the grounded answer, citing where it came from. When several questions arrive batched, answer them in one pass.

## Anti-patterns — never do these

- **Never create or edit a Gadget file before the plan exists** with no open lookups.
- **Never write or state a PayPal fact from memory** — every method, field name, enum value and issue code must come from the contract sheet or a fresh look at the declaration, never from recall or from a companion skill. And **never write a call from memory "to fix later".**
- **Never switch on `error.name` or `httpStatus` alone where an `issue` code says more** — branch on `details[].issue` for the cases the task handles, and give unknown codes and unknown statuses a default arm.
- **Never assume one page is all, and never leave a page loop unbounded** — every walk carries a page cap of your own.
- **Don't web-search PayPal or read its REST docs to find a field** — they describe the HTTP API in snake_case (`purchase_units`, `currency_code`), with fields and defaults this binding does not expose; the declaration is the ground truth.
- **Never introspect the binding at run time** (`Object.keys(env.PAYPAL)`, logging it): it is an RPC stub and answers nothing useful. Read the declaration.
- **Never call `fetch` for PayPal or try to load a PayPal SDK** — there is no network; the binding is the only route.
- **Never store, log or return card details**, and never put them on a claim row.
- **Never derive `payPalRequestId` from a value made per attempt**, never reuse one for a different request, and **never repeat a `pending` write** — poll `getActionResult`.
- **Never ship `payPalMockResponse`** outside tests.
- **Never capture the old authorization id after `reauthorizePayment`** — it returns a new one.
- **Never re-create a claim from a counter that did not move** — the new claim reuses the old key and gets the old outcome back.
- **Never renew a hold in reaction to `AUTHORIZATION_EXPIRED`** — that issue means the hold is past renewal. Renew before capture, once the honor period has passed (`paypal-getting-started`, the authorization lifecycle).
