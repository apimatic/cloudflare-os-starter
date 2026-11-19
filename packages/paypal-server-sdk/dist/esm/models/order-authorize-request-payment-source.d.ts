import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayRequest } from "./apple-pay-request.js";
import { type CardRequest } from "./card-request.js";
import { type GooglePayRequest } from "./google-pay-request.js";
import { type PayPalWallet } from "./pay-pal-wallet.js";
import { type Token } from "./token.js";
import { type VenmoWalletRequest } from "./venmo-wallet-request.js";
/** The payment source definition. */
export type OrderAuthorizeRequestPaymentSource = {
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
    /** Information needed to pay using ApplePay. */
    applePay?: ApplePayRequest;
    /** Information needed to pay using Google Pay. */
    googlePay?: GooglePayRequest;
    /** Information needed to pay using Venmo. */
    venmo?: VenmoWalletRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderAuthorizeRequestPaymentSourceInternalSchema: Schema<OrderAuthorizeRequestPaymentSource>;
export declare const orderAuthorizeRequestPaymentSourceSchema: Schema<OrderAuthorizeRequestPaymentSource>;
