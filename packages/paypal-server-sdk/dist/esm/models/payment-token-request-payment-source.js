import * as s from "../core/validation/index.js";
import { paymentTokenRequestCardInternalSchema, paymentTokenRequestCardSchema, } from "./payment-token-request-card.js";
import { vaultTokenRequestInternalSchema, vaultTokenRequestSchema, } from "./vault-token-request.js";
const paymentTokenRequestPaymentSourceProperties = {
    card: s.optional(s.lazy(() => paymentTokenRequestCardInternalSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestInternalSchema)),
};
export const paymentTokenRequestPaymentSourceInternalSchema = s.object(paymentTokenRequestPaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const paymentTokenRequestPaymentSourceSchema = s.lazySchema(() => s.object({
    ...paymentTokenRequestPaymentSourceProperties,
    card: s.optional(s.lazy(() => paymentTokenRequestCardSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payment-token-request-payment-source.js.map