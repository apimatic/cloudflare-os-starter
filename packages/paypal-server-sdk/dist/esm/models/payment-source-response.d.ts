import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayPaymentObject } from "./apple-pay-payment-object.js";
import { type BancontactPaymentObject } from "./bancontact-payment-object.js";
import { type BlikPaymentObject } from "./blik-payment-object.js";
import { type CardResponse } from "./card-response.js";
import { type EpsPaymentObject } from "./eps-payment-object.js";
import { type GiropayPaymentObject } from "./giropay-payment-object.js";
import { type GooglePayWalletResponse } from "./google-pay-wallet-response.js";
import { type IDealPaymentObject } from "./ideal-payment-object.js";
import { type MyBankPaymentObject } from "./my-bank-payment-object.js";
import { type P24PaymentObject } from "./p24-payment-object.js";
import { type PayPalWalletResponse } from "./pay-pal-wallet-response.js";
import { type SofortPaymentObject } from "./sofort-payment-object.js";
import { type TrustlyPaymentObject } from "./trustly-payment-object.js";
import { type VenmoWalletResponse } from "./venmo-wallet-response.js";
/** The payment source used to fund the payment. */
export type PaymentSourceResponse = {
    /** The payment card to use to fund a payment. Card can be a credit or debit card. */
    card?: CardResponse;
    /** The PayPal Wallet response. */
    paypal?: PayPalWalletResponse;
    /** Information used to pay Bancontact. */
    bancontact?: BancontactPaymentObject;
    /** Information used to pay using BLIK. */
    blik?: BlikPaymentObject;
    /** Information used to pay using eps. */
    eps?: EpsPaymentObject;
    /** Information needed to pay using giropay. */
    giropay?: GiropayPaymentObject;
    /** Information used to pay using iDEAL. */
    ideal?: IDealPaymentObject;
    /** Information used to pay using MyBank. */
    mybank?: MyBankPaymentObject;
    /** Information used to pay using P24(Przelewy24). */
    p24?: P24PaymentObject;
    /** Information used to pay using Sofort. */
    sofort?: SofortPaymentObject;
    /** Information needed to pay using Trustly. */
    trustly?: TrustlyPaymentObject;
    /** Information needed to pay using ApplePay. */
    applePay?: ApplePayPaymentObject;
    /** Google Pay Wallet payment data. */
    googlePay?: GooglePayWalletResponse;
    /** Venmo wallet response. */
    venmo?: VenmoWalletResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentSourceResponseInternalSchema: Schema<PaymentSourceResponse>;
export declare const paymentSourceResponseSchema: Schema<PaymentSourceResponse>;
