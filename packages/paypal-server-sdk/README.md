# paypal-server-sdk (vendored)

The ESM build of the APIMatic-generated PayPal Server SDK, which is not published to npm. Only the
PayPal gatekeeper (`packages/custom-gatekeeper`) imports it; Gadgets never do.

| | |
| --- | --- |
| Source | https://github.com/apimatic/paypal-typescript-sdk |
| Commit | `910a1810ed78accfed0f2892c3333f94c75341e5` (2026-11-19) |
| Version | 2.29.0 |
| License | MIT (`LICENSE`) |

`dist/esm` is the SDK's own `tshy` build with source maps removed. `sdk-map.md` and `map/` are the
SDK's generated operation map, kept for reference.

## Updating

```sh
git clone --depth 1 https://github.com/apimatic/paypal-typescript-sdk
cd paypal-typescript-sdk
pnpm install --ignore-workspace
pnpm run build
```

Then replace `dist/esm` (without `*.map`), `sdk-map.md` and `map/` here, update the table above, and
run the gatekeeper's tests.
