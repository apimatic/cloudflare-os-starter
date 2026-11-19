import * as s from "../core/validation/index.js";
import { applePayRequestInternalSchema, applePayRequestSchema, } from "./apple-pay-request.js";
import { cardRequestInternalSchema, cardRequestSchema } from "./card-request.js";
import { googlePayRequestInternalSchema, googlePayRequestSchema, } from "./google-pay-request.js";
import { payPalWalletInternalSchema, payPalWalletSchema } from "./pay-pal-wallet.js";
import { tokenInternalSchema, tokenSchema } from "./token.js";
import { venmoWalletRequestInternalSchema, venmoWalletRequestSchema, } from "./venmo-wallet-request.js";
const orderAuthorizeRequestPaymentSourceProperties = {
    card: s.optional(s.lazy(() => cardRequestInternalSchema)),
    token: s.optional(s.lazy(() => tokenInternalSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletInternalSchema)),
    applePay: s.optional(s.lazy(() => applePayRequestInternalSchema)),
    googlePay: s.optional(s.lazy(() => googlePayRequestInternalSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletRequestInternalSchema)),
    _keysMap: {
        applePay: "apple_pay",
        googlePay: "google_pay",
    },
};
export const orderAuthorizeRequestPaymentSourceInternalSchema = s.object(orderAuthorizeRequestPaymentSourceProperties, {
    additionalProperties: s.json(),
});
export const orderAuthorizeRequestPaymentSourceSchema = s.lazySchema(() => s.object({
    ...orderAuthorizeRequestPaymentSourceProperties,
    card: s.optional(s.lazy(() => cardRequestSchema)),
    token: s.optional(s.lazy(() => tokenSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletSchema)),
    applePay: s.optional(s.lazy(() => applePayRequestSchema)),
    googlePay: s.optional(s.lazy(() => googlePayRequestSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletRequestSchema)),
}, { additionalProperties: s.json() }));
