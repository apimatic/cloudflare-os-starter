import * as s from "../core/validation/index.js";
import { applePayRequestInternalSchema, applePayRequestSchema, } from "./apple-pay-request.js";
import { bancontactPaymentRequestInternalSchema, bancontactPaymentRequestSchema, } from "./bancontact-payment-request.js";
import { blikPaymentRequestInternalSchema, blikPaymentRequestSchema, } from "./blik-payment-request.js";
import { cardRequestInternalSchema, cardRequestSchema } from "./card-request.js";
import { epsPaymentRequestInternalSchema, epsPaymentRequestSchema, } from "./eps-payment-request.js";
import { giropayPaymentRequestInternalSchema, giropayPaymentRequestSchema, } from "./giropay-payment-request.js";
import { googlePayRequestInternalSchema, googlePayRequestSchema, } from "./google-pay-request.js";
import { iDealPaymentRequestInternalSchema, iDealPaymentRequestSchema, } from "./ideal-payment-request.js";
import { myBankPaymentRequestInternalSchema, myBankPaymentRequestSchema, } from "./my-bank-payment-request.js";
import { p24PaymentRequestInternalSchema, p24PaymentRequestSchema, } from "./p24-payment-request.js";
import { payPalWalletInternalSchema, payPalWalletSchema } from "./pay-pal-wallet.js";
import { sofortPaymentRequestInternalSchema, sofortPaymentRequestSchema, } from "./sofort-payment-request.js";
import { tokenInternalSchema, tokenSchema } from "./token.js";
import { trustlyPaymentRequestInternalSchema, trustlyPaymentRequestSchema, } from "./trustly-payment-request.js";
import { venmoWalletRequestInternalSchema, venmoWalletRequestSchema, } from "./venmo-wallet-request.js";
const paymentSourceProperties = {
    card: s.optional(s.lazy(() => cardRequestInternalSchema)),
    token: s.optional(s.lazy(() => tokenInternalSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletInternalSchema)),
    bancontact: s.optional(s.lazy(() => bancontactPaymentRequestInternalSchema)),
    blik: s.optional(s.lazy(() => blikPaymentRequestInternalSchema)),
    eps: s.optional(s.lazy(() => epsPaymentRequestInternalSchema)),
    giropay: s.optional(s.lazy(() => giropayPaymentRequestInternalSchema)),
    ideal: s.optional(s.lazy(() => iDealPaymentRequestInternalSchema)),
    mybank: s.optional(s.lazy(() => myBankPaymentRequestInternalSchema)),
    p24: s.optional(s.lazy(() => p24PaymentRequestInternalSchema)),
    sofort: s.optional(s.lazy(() => sofortPaymentRequestInternalSchema)),
    trustly: s.optional(s.lazy(() => trustlyPaymentRequestInternalSchema)),
    applePay: s.optional(s.lazy(() => applePayRequestInternalSchema)),
    googlePay: s.optional(s.lazy(() => googlePayRequestInternalSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletRequestInternalSchema)),
    _keysMap: {
        applePay: "apple_pay",
        googlePay: "google_pay",
    },
};
export const paymentSourceInternalSchema = s.object(paymentSourceProperties, { additionalProperties: s.json() });
export const paymentSourceSchema = s.lazySchema(() => s.object({
    ...paymentSourceProperties,
    card: s.optional(s.lazy(() => cardRequestSchema)),
    token: s.optional(s.lazy(() => tokenSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletSchema)),
    bancontact: s.optional(s.lazy(() => bancontactPaymentRequestSchema)),
    blik: s.optional(s.lazy(() => blikPaymentRequestSchema)),
    eps: s.optional(s.lazy(() => epsPaymentRequestSchema)),
    giropay: s.optional(s.lazy(() => giropayPaymentRequestSchema)),
    ideal: s.optional(s.lazy(() => iDealPaymentRequestSchema)),
    mybank: s.optional(s.lazy(() => myBankPaymentRequestSchema)),
    p24: s.optional(s.lazy(() => p24PaymentRequestSchema)),
    sofort: s.optional(s.lazy(() => sofortPaymentRequestSchema)),
    trustly: s.optional(s.lazy(() => trustlyPaymentRequestSchema)),
    applePay: s.optional(s.lazy(() => applePayRequestSchema)),
    googlePay: s.optional(s.lazy(() => googlePayRequestSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletRequestSchema)),
}, { additionalProperties: s.json() }));
