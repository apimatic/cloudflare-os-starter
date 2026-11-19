import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayRequest } from "./apple-pay-request.js";
import { type BancontactPaymentRequest } from "./bancontact-payment-request.js";
import { type BlikPaymentRequest } from "./blik-payment-request.js";
import { type CardRequest } from "./card-request.js";
import { type EpsPaymentRequest } from "./eps-payment-request.js";
import { type GiropayPaymentRequest } from "./giropay-payment-request.js";
import { type GooglePayRequest } from "./google-pay-request.js";
import { type IDealPaymentRequest } from "./ideal-payment-request.js";
import { type MyBankPaymentRequest } from "./my-bank-payment-request.js";
import { type P24PaymentRequest } from "./p24-payment-request.js";
import { type PayPalWallet } from "./pay-pal-wallet.js";
import { type SofortPaymentRequest } from "./sofort-payment-request.js";
import { type Token } from "./token.js";
import { type TrustlyPaymentRequest } from "./trustly-payment-request.js";
import { type VenmoWalletRequest } from "./venmo-wallet-request.js";
/** The payment source definition. */
export type PaymentSource = {
    /**
     * The payment card to use to fund a payment. Can be a credit or debit card. Note: Passing card
     * number, cvv and expiry directly via the API requires PCI SAQ D compliance. *PayPal offers a
     * mechanism by which you do not have to take on the PCI SAQ D burden by using hosted fields -
     * refer to this Integration Guide*.
     */
    card?: CardRequest;
    /** The tokenized payment source to fund a payment. */
    token?: Token;
    /** A resource that identifies a PayPal Wallet is used for payment. */
    paypal?: PayPalWallet;
    /** Information needed to pay using Bancontact. */
    bancontact?: BancontactPaymentRequest;
    /** Information needed to pay using BLIK. */
    blik?: BlikPaymentRequest;
    /** Information needed to pay using eps. */
    eps?: EpsPaymentRequest;
    /** Information needed to pay using giropay. */
    giropay?: GiropayPaymentRequest;
    /** Information needed to pay using iDEAL. */
    ideal?: IDealPaymentRequest;
    /** Information needed to pay using MyBank. */
    mybank?: MyBankPaymentRequest;
    /** Information needed to pay using P24 (Przelewy24). */
    p24?: P24PaymentRequest;
    /** Information needed to pay using Sofort. */
    sofort?: SofortPaymentRequest;
    /** Information needed to pay using Trustly. */
    trustly?: TrustlyPaymentRequest;
    /** Information needed to pay using ApplePay. */
    applePay?: ApplePayRequest;
    /** Information needed to pay using Google Pay. */
    googlePay?: GooglePayRequest;
    /** Information needed to pay using Venmo. */
    venmo?: VenmoWalletRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentSourceInternalSchema: Schema<PaymentSource>;
export declare const paymentSourceSchema: Schema<PaymentSource>;
