import * as s from "../core/validation/index.js";
import { payPalPaymentTokenInternalSchema, payPalPaymentTokenSchema, } from "./pay-pal-payment-token.js";
import { setupTokenResponseCardInternalSchema, setupTokenResponseCardSchema, } from "./setup-token-response-card.js";
import { venmoPaymentTokenInternalSchema, venmoPaymentTokenSchema, } from "./venmo-payment-token.js";
const setupTokenResponsePaymentSourceProperties = {
    card: s.optional(s.lazy(() => setupTokenResponseCardInternalSchema)),
    paypal: s.optional(s.lazy(() => payPalPaymentTokenInternalSchema)),
    venmo: s.optional(s.lazy(() => venmoPaymentTokenInternalSchema)),
};
export const setupTokenResponsePaymentSourceInternalSchema = s.object(setupTokenResponsePaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const setupTokenResponsePaymentSourceSchema = s.lazySchema(() => s.object({
    ...setupTokenResponsePaymentSourceProperties,
    card: s.optional(s.lazy(() => setupTokenResponseCardSchema)),
    paypal: s.optional(s.lazy(() => payPalPaymentTokenSchema)),
    venmo: s.optional(s.lazy(() => venmoPaymentTokenSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=setup-token-response-payment-source.js.map