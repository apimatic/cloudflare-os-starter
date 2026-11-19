# PayPal gatekeeper (sandbox)

This deployment's custom-gatekeeper slot holds a PayPal gatekeeper. It gives agents and Gadgets a
typed binding, `env.PAYPAL`, over the deployment's PayPal **sandbox** account: orders, card
authorizations, captures, reauthorizations, voids, refunds, saved cards (vault) and transaction
search. Gadgets cannot reach the internet themselves; every PayPal call goes through here.

The class names (`GatekeeperVendor`, `CustomAccount`, `CustomGatekeeper`, `CustomVerifier`) are the
slot's: `cf-os deploy` binds this Worker as `GATEKEEPER_CUSTOM`, and the `v0` migration created the
`CustomGatekeeper` Durable Object class.

## Files

| File | What it holds |
| --- | --- |
| `src/types.d.ts` | The agent-facing API, read verbatim by the agent through `describeBinding`. Method and field names follow the PayPal Server SDK. |
| `src/types-code.ts` | Generated from `types.d.ts` by `pnpm run types:sync`; `types:check` fails when it is stale. |
| `src/paypal-session.ts` | `env.PAYPAL`: reads, the write protocol, `getActionResult()`. |
| `src/paypal-operations.ts` | Each operation's SDK call, value checks and approver-facing description. |
| `src/paypal-actions.ts` | Pending and finished writes, in the gatekeeper's SQLite storage. |
| `src/paypal-errors.ts` | SDK failures → `PayPalError`. |
| `src/paypal-client.ts` | The SDK client: sandbox only, credentials from secrets. |
| `src/custom.ts` | Vendor, account, gatekeeper Durable Object, verifier. |

The SDK is vendored in `packages/paypal-server-sdk` (not published to npm).

## Configuration

Two Wrangler secrets on this Worker, from a PayPal sandbox REST app with Advanced Credit and Debit
Card Payments, Vault and Transaction Search enabled:

```sh
pnpm exec wrangler secret put PAYPAL_CLIENT_ID --name <customGatekeeper worker name>
pnpm exec wrangler secret put PAYPAL_CLIENT_SECRET --name <customGatekeeper worker name>
```

Without them every call answers with an error naming the missing secrets. There is no setting for
live PayPal: the client is built for the sandbox and accepts no base-URL override.

## Behaviour

- **Results, not exceptions.** Every method resolves to `{kind: "ok", value}` or
  `{kind: "error", error}`; writes can also be `pending` or `declined`. Errors carry PayPal's `name`,
  `debugId` and `details[].issue`, and never a rejected field's value.
- **Writes.** Each write is submitted to the approval queue under one action kind,
  `PayPal sandbox payments`, marked auto-approvable. With auto-approval of that kind switched on,
  the Workshop applies the write right after submission; the session waits up to 25 seconds for that
  and returns PayPal's answer directly, otherwise `{kind: "pending", actionId}`. Nothing is
  simulated, so writes set `awaitDecision`.
- **Idempotency.** Money-moving and card-saving calls require `payPalRequestId`, sent as
  `PayPal-Request-Id`. Per workspace, a key names one request of one operation (matched on a
  fingerprint of the request with card details reduced to the last four digits):
  - the same key and request return the stored outcome without a new approval or PayPal call;
  - an outcome PayPal never answered (declined approval, network error, unreadable answer, missing
    or refused credentials) is retired, so repeating the call sends it again;
  - the same key with a different request is refused as `invalid_request`.
  POST calls always send `Prefer: return=representation`.
- **Card data.** Card format is checked before anything is sent (the SDK's encoder is lenient).
  Approval records show the last four digits only. A pending write's request, which holds the card
  details, is erased from storage as soon as the write is applied or declined.
- **Observers.** The binding is one atomic resource, the shared sandbox account, so sharing uses
  the pinned Cloudflare OS's `addObserver()` check (the write-gatekeeper skill's strategy B): a
  collaborator is admitted exactly when their verifier, minted by this vendor, says they hold a
  PayPal account here; any other answer throws. Nothing per read is tracked, and
  `removeObserver()` is a no-op. (Newer Cloudflare OS versions add per-read `subresources` and
  `verifyObserverAccess()`; move to those when the submodule pin moves past them.)

## Check

```sh
pnpm run types:check
pnpm run test:run
pnpm exec wrangler deploy --dry-run
```
