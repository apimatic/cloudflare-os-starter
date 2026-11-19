// The PayPal SDK client this Worker calls PayPal through: sandbox only, authenticated with the
// deployment's own REST app credentials, which never leave this Worker.

import { PayPalServerSdkClient, ServerEnvironment } from "paypal-server-sdk";

/** Thrown when the deployment has not set the PayPal secrets on this Worker. */
export class PayPalNotConfiguredError extends Error {
  constructor() {
    super(
      "PayPal is not configured on this deployment: the administrator must set the " +
        "PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET secrets on the PayPal gatekeeper Worker.",
    );
    this.name = "PayPalNotConfiguredError";
  }
}

type PayPalEnv = { PAYPAL_CLIENT_ID?: string; PAYPAL_CLIENT_SECRET?: string };

type FetchLike = (input: Request | string | URL, init?: RequestInit) => Promise<Response>;

// One client per isolate, so its OAuth token is fetched once and reused until it expires. Keyed by
// the credentials, so a rotated secret takes effect on the next call.
let cached: { key: string; client: PayPalServerSdkClient } | undefined;

// Tests replace the transport; production always uses the runtime's fetch.
let fetchOverride: FetchLike | undefined;

/** The client for `env`'s credentials. Throws `PayPalNotConfiguredError` without them. */
export function payPalClient(env: PayPalEnv): PayPalServerSdkClient {
  const clientId = env.PAYPAL_CLIENT_ID;
  const clientSecret = env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new PayPalNotConfiguredError();

  const key = `${clientId}\n${clientSecret}`;
  if (cached?.key !== key) {
    const transport = fetchOverride;
    cached = {
      key,
      client: new PayPalServerSdkClient({
        // Sandbox only, and no base-URL override: no request from this Worker can reach live PayPal.
        serverEnvironment: ServerEnvironment.Sandbox,
        oauth2: { clientId, clientSecret },
        // POSTs are not retried (the SDK's default); payPalRequestId makes a caller's retry safe.
        retry: { maxRetries: 2, timeout: 30_000 },
        fetch: transport ?? ((input, init) => fetch(input, init)),
      }),
    };
  }
  return cached.client;
}

/** Test seam: routes every PayPal request through `transport`, or back to `fetch` with undefined. */
export function setPayPalTransportForTesting(transport: FetchLike | undefined): void {
  fetchOverride = transport;
  cached = undefined;
}
