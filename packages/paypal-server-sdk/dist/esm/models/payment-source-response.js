import * as s from "../core/validation/index.js";
import { applePayPaymentObjectInternalSchema, applePayPaymentObjectSchema, } from "./apple-pay-payment-object.js";
import { bancontactPaymentObjectInternalSchema, bancontactPaymentObjectSchema, } from "./bancontact-payment-object.js";
import { blikPaymentObjectInternalSchema, blikPaymentObjectSchema, } from "./blik-payment-object.js";
import { cardResponseInternalSchema, cardResponseSchema } from "./card-response.js";
import { epsPaymentObjectInternalSchema, epsPaymentObjectSchema, } from "./eps-payment-object.js";
import { giropayPaymentObjectInternalSchema, giropayPaymentObjectSchema, } from "./giropay-payment-object.js";
import { googlePayWalletResponseInternalSchema, googlePayWalletResponseSchema, } from "./google-pay-wallet-response.js";
import { iDealPaymentObjectInternalSchema, iDealPaymentObjectSchema, } from "./ideal-payment-object.js";
import { myBankPaymentObjectInternalSchema, myBankPaymentObjectSchema, } from "./my-bank-payment-object.js";
import { p24PaymentObjectInternalSchema, p24PaymentObjectSchema, } from "./p24-payment-object.js";
import { payPalWalletResponseInternalSchema, payPalWalletResponseSchema, } from "./pay-pal-wallet-response.js";
import { sofortPaymentObjectInternalSchema, sofortPaymentObjectSchema, } from "./sofort-payment-object.js";
import { trustlyPaymentObjectInternalSchema, trustlyPaymentObjectSchema, } from "./trustly-payment-object.js";
import { venmoWalletResponseInternalSchema, venmoWalletResponseSchema, } from "./venmo-wallet-response.js";
const paymentSourceResponseProperties = {
    card: s.optional(s.lazy(() => cardResponseInternalSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletResponseInternalSchema)),
    bancontact: s.optional(s.lazy(() => bancontactPaymentObjectInternalSchema)),
    blik: s.optional(s.lazy(() => blikPaymentObjectInternalSchema)),
    eps: s.optional(s.lazy(() => epsPaymentObjectInternalSchema)),
    giropay: s.optional(s.lazy(() => giropayPaymentObjectInternalSchema)),
    ideal: s.optional(s.lazy(() => iDealPaymentObjectInternalSchema)),
    mybank: s.optional(s.lazy(() => myBankPaymentObjectInternalSchema)),
    p24: s.optional(s.lazy(() => p24PaymentObjectInternalSchema)),
    sofort: s.optional(s.lazy(() => sofortPaymentObjectInternalSchema)),
    trustly: s.optional(s.lazy(() => trustlyPaymentObjectInternalSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentObjectInternalSchema)),
    googlePay: s.optional(s.lazy(() => googlePayWalletResponseInternalSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletResponseInternalSchema)),
    _keysMap: {
        applePay: "apple_pay",
        googlePay: "google_pay",
    },
};
export const paymentSourceResponseInternalSchema = s.object(paymentSourceResponseProperties, { additionalProperties: s.json() });
export const paymentSourceResponseSchema = s.lazySchema(() => s.object({
    ...paymentSourceResponseProperties,
    card: s.optional(s.lazy(() => cardResponseSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletResponseSchema)),
    bancontact: s.optional(s.lazy(() => bancontactPaymentObjectSchema)),
    blik: s.optional(s.lazy(() => blikPaymentObjectSchema)),
    eps: s.optional(s.lazy(() => epsPaymentObjectSchema)),
    giropay: s.optional(s.lazy(() => giropayPaymentObjectSchema)),
    ideal: s.optional(s.lazy(() => iDealPaymentObjectSchema)),
    mybank: s.optional(s.lazy(() => myBankPaymentObjectSchema)),
    p24: s.optional(s.lazy(() => p24PaymentObjectSchema)),
    sofort: s.optional(s.lazy(() => sofortPaymentObjectSchema)),
    trustly: s.optional(s.lazy(() => trustlyPaymentObjectSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentObjectSchema)),
    googlePay: s.optional(s.lazy(() => googlePayWalletResponseSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletResponseSchema)),
}, { additionalProperties: s.json() }));
