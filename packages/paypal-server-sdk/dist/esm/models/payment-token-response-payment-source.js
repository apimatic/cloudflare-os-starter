import * as s from "../core/validation/index.js";
import { applePayPaymentTokenInternalSchema, applePayPaymentTokenSchema, } from "./apple-pay-payment-token.js";
import { cardPaymentTokenEntityInternalSchema, cardPaymentTokenEntitySchema, } from "./card-payment-token-entity.js";
import { payPalPaymentTokenInternalSchema, payPalPaymentTokenSchema, } from "./pay-pal-payment-token.js";
import { venmoPaymentTokenInternalSchema, venmoPaymentTokenSchema, } from "./venmo-payment-token.js";
const paymentTokenResponsePaymentSourceProperties = {
    card: s.optional(s.lazy(() => cardPaymentTokenEntityInternalSchema)),
    paypal: s.optional(s.lazy(() => payPalPaymentTokenInternalSchema)),
    venmo: s.optional(s.lazy(() => venmoPaymentTokenInternalSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentTokenInternalSchema)),
    _keysMap: {
        applePay: "apple_pay",
    },
};
export const paymentTokenResponsePaymentSourceInternalSchema = s.object(paymentTokenResponsePaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const paymentTokenResponsePaymentSourceSchema = s.lazySchema(() => s.object({
    ...paymentTokenResponsePaymentSourceProperties,
    card: s.optional(s.lazy(() => cardPaymentTokenEntitySchema)),
    paypal: s.optional(s.lazy(() => payPalPaymentTokenSchema)),
    venmo: s.optional(s.lazy(() => venmoPaymentTokenSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentTokenSchema)),
}, { additionalProperties: s.json() }));
