import { cloudflareTest } from "@cloudflare/vitest-plugin";
import capnwebValidate from "capnweb-validate/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    capnwebValidate(),
    cloudflareTest({
      main: "./__tests__/worker.ts",
      miniflare: {
        compatibilityDate: "2026-09-04",
        compatibilityFlags: ["allow_irrevocable_stub_storage", "nodejs_compat"],
        // The gatekeeper's Durable Object, so tests run its SQLite storage and applyAction().
        durableObjects: { GATEKEEPER: { className: "CustomGatekeeper", useSQLite: true } },
        // Placeholders: every PayPal request in tests goes to a fake transport.
        bindings: { PAYPAL_CLIENT_ID: "test-id", PAYPAL_CLIENT_SECRET: "test-secret" },
      },
    }),
  ],
  test: { include: ["__tests__/*.test.ts"] },
});
