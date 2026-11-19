import * as s from "../core/validation/index.js";
import { bankRequestInternalSchema, bankRequestSchema } from "./bank-request.js";
import { setupTokenRequestCardInternalSchema, setupTokenRequestCardSchema, } from "./setup-token-request-card.js";
import { vaultApplePayRequestInternalSchema, vaultApplePayRequestSchema, } from "./vault-apple-pay-request.js";
import { vaultPayPalWalletRequestInternalSchema, vaultPayPalWalletRequestSchema, } from "./vault-pay-pal-wallet-request.js";
import { vaultTokenRequestInternalSchema, vaultTokenRequestSchema, } from "./vault-token-request.js";
import { vaultVenmoRequestInternalSchema, vaultVenmoRequestSchema, } from "./vault-venmo-request.js";
const setupTokenRequestPaymentSourceProperties = {
    card: s.optional(s.lazy(() => setupTokenRequestCardInternalSchema)),
    paypal: s.optional(s.lazy(() => vaultPayPalWalletRequestInternalSchema)),
    venmo: s.optional(s.lazy(() => vaultVenmoRequestInternalSchema)),
    applePay: s.optional(s.lazy(() => vaultApplePayRequestInternalSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestInternalSchema)),
    bank: s.optional(s.lazy(() => bankRequestInternalSchema)),
    _keysMap: {
        applePay: "apple_pay",
    },
};
export const setupTokenRequestPaymentSourceInternalSchema = s.object(setupTokenRequestPaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const setupTokenRequestPaymentSourceSchema = s.lazySchema(() => s.object({
    ...setupTokenRequestPaymentSourceProperties,
    card: s.optional(s.lazy(() => setupTokenRequestCardSchema)),
    paypal: s.optional(s.lazy(() => vaultPayPalWalletRequestSchema)),
    venmo: s.optional(s.lazy(() => vaultVenmoRequestSchema)),
    applePay: s.optional(s.lazy(() => vaultApplePayRequestSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestSchema)),
    bank: s.optional(s.lazy(() => bankRequestSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=setup-token-request-payment-source.js.map