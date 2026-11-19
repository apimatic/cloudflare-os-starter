declare namespace Cloudflare {
  interface GlobalProps {
    mainModule: typeof import("./index.js");
    durableNamespaces: "CustomGatekeeper";
  }

  // Wrangler secrets, set per deployment (`wrangler secret put`); never in wrangler.jsonc.
  interface Env {
    PAYPAL_CLIENT_ID?: string;
    PAYPAL_CLIENT_SECRET?: string;
  }
}
