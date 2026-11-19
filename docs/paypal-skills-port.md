# PayPal skills: before and after the port

The APIMatic PayPal TypeScript plugin's 10 skills and 1 subagent became 7 skills for the Cloudflare
OS agent, which calls PayPal through the `PAYPAL` gatekeeper binding (`packages/custom-gatekeeper`)
instead of the SDK. Every original was read in full, section by section, against the gatekeeper's
`types.d.ts` and implementation before anything was changed. The ported skills live in
`context/paypal-skills/<name>/SKILL.md`, ready to upload to a Context Library collection.

| Before (lines) | After (lines) | Verdict | Kept | Removed | Added |
| --- | --- | --- | --- | --- | --- |
| `typescript-getting-started` (209) | `paypal-getting-started` (126) | Replaced | Lookup-layer principle (ground facts in a lookup, never recall; mark UNVERIFIED); one-pass contract sheet; flat request shape; sensitive-data rule; contract-sheet checklist (reworked) | Install, imports, client, environments, OAuth, SDK map and source-file table, schema `validate`, logging switches, error-class family | Binding identity table; offered vs not offered; result envelope; `payPalRequestId` rules; checks made before sending; card-data flow client.js → server.js → PAYPAL; no webhooks |
| `typescript-integrate-pay-pal-server-sdk` (170) + `pay-pal-server-sdk-planner` (22) | `paypal-integrate` (178) | Kept with edits | Plan-first workflow and HARD GATE; the 1b tables (duplicate claims, unknown outcomes, cross-operation invariants, optional fields, when the API says no); TBD discipline; required reading; most anti-patterns | Planner subagent (unsupported; rules folded into Step 1); install, toolchain, `tsc`, ESM/CJS, environment choice, `ClientOptions` | Failure triage; Durable Object claim pattern (synchronous conditional insert before the first `await`); per-write re-read table; `pending`/`declined`; PayPal-specific invariants; envelope-based refusal table |
| `typescript-calling-endpoints` (389) | `paypal-calling-endpoints` (155) | Replaced | One request object; body vs addressing fields; camelCase, not wire names; defaults are applied; resolving is the success signal; bounded page walks and concurrency | `ApiPromise`/`asApiResult`, `RequestOptions`, `Pageable`, multipart/bytes/XML, enum constants, imports | `describeBinding` as the source; envelope switch; `pending`; manual page loop; "ok is not business success" |
| `typescript-models` (362) + `reference.md` | `paypal-models` (104) | Replaced | Shapes, not classes; omit rather than `undefined`; guarded nested reads; empty answers decode silently; decimal-string money; open enums with a default arm; camelCase vs wire; unknown members | Model files, unions, `Date` codecs (wrong for PayPal), bytes, schema companion, reference.md | Minor-unit arithmetic; RFC 3339 strings; `additionalProperties` with snake_case keys; result `pending`/`declined` vs PayPal `PENDING`/`DENIED` |
| `typescript-error-handling` (569) | `paypal-error-handling` (141) | Replaced | Closed switch over kinds; unknown vs failed on writes; never retry encode errors; deployment faults aren't the caller's; missing member ≠ error; guard every call site; convert in one place; presenting-failures rules | Error classes, `instanceof`, typed arms, `payload`, `rawBody`, ESM/CJS, pagination errors | `PayPalError` table; issue-code table; what still throws over RPC; `toUserError` |
| `typescript-configuration-resilience` (873) | `paypal-resilience` (113) | Replaced | "Not resent" ≠ "didn't happen"; key on what you hold, never per attempt; no stacked retry layers; bound every page walk; never return a partial set as complete; total-time budget | `ClientOptions`, fetch seam, server options, retry tuning, logging, proxies, TLS, pooling, event streams | What the gatekeeper owns; repeat-by-outcome table; reconciliation reads; pending polling; 31-day windows; symptom table |
| `typescript-testing` (589) | `paypal-testing` (115) | Replaced | Assert the outgoing request; cover every failure path; the reason must reach the caller; never assert on message text; separate sandbox tests | Fake `fetch`, wire-shape stubs, OAuth stubs, MockAgent, base-URL tests | Fake `PAYPAL`; `selfTest()` pattern; paths table; `payPalMockResponse` and sandbox cards |
| `typescript-authentication` (390) | — | Removed | Deployment-fault 401s → error-handling; never echo secrets → getting-started | All | — |
| `typescript-client-initialization` (338) | — | Removed | Inject the client for testability → testing; no webhooks → getting-started | All | — |
| `typescript-event-streams` (144) | — | Removed | Nothing (no PayPal operation streams) | All | — |

Total: 4,180 lines before (reference.md and the subagent included), 932 after.

## Gatekeeper changes the audit forced

- A repeated `payPalRequestId` replayed a stored network error forever. Unknown outcomes (network,
  5xx, unreadable answer, missing or refused credentials, user-declined) are now re-sent on repeat;
  PayPal answers stay final.
- The same id with a different request is refused as `invalid_request` (matched on a fingerprint
  that keeps only a card's last four digits).
- Reads return `NOT_CONFIGURED` instead of throwing; a token-service outage is no longer blamed on
  the credentials; an unreadable answer keeps its status and is named `UNREADABLE_RESPONSE`.
- `intent: "CAPTURE"` without a card is refused up front; `balanceAffectingRecordsOnly` is exposed.
- `types.d.ts` documents response extras (`additionalProperties`), page-size limits, the value
  checks, and a JSON form for every mock example.

## Still unverified (marked so in the skills)

Sandbox test card numbers; `payPalMockResponse` codes other than `INSTRUMENT_DECLINED` and
`AUTHORIZATION_EXPIRED`; whether `createPaymentToken` accepts a raw card on this PayPal account.
