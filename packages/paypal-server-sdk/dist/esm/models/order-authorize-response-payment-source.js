import * as s from "../core/validation/index.js";
import { applePayPaymentObjectInternalSchema, applePayPaymentObjectSchema, } from "./apple-pay-payment-object.js";
import { cardResponseInternalSchema, cardResponseSchema } from "./card-response.js";
import { googlePayWalletResponseInternalSchema, googlePayWalletResponseSchema, } from "./google-pay-wallet-response.js";
import { payPalWalletResponseInternalSchema, payPalWalletResponseSchema, } from "./pay-pal-wallet-response.js";
import { venmoWalletResponseInternalSchema, venmoWalletResponseSchema, } from "./venmo-wallet-response.js";
const orderAuthorizeResponsePaymentSourceProperties = {
    card: s.optional(s.lazy(() => cardResponseInternalSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletResponseInternalSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentObjectInternalSchema)),
    googlePay: s.optional(s.lazy(() => googlePayWalletResponseInternalSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletResponseInternalSchema)),
    _keysMap: {
        applePay: "apple_pay",
        googlePay: "google_pay",
    },
};
export const orderAuthorizeResponsePaymentSourceInternalSchema = s.object(orderAuthorizeResponsePaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const orderAuthorizeResponsePaymentSourceSchema = s.lazySchema(() => s.object({
    ...orderAuthorizeResponsePaymentSourceProperties,
    card: s.optional(s.lazy(() => cardResponseSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletResponseSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentObjectSchema)),
    googlePay: s.optional(s.lazy(() => googlePayWalletResponseSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletResponseSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=order-authorize-response-payment-source.js.map