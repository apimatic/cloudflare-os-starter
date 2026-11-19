import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayPaymentObject } from "./apple-pay-payment-object.js";
import { type CardResponse } from "./card-response.js";
import { type GooglePayWalletResponse } from "./google-pay-wallet-response.js";
import { type PayPalWalletResponse } from "./pay-pal-wallet-response.js";
import { type VenmoWalletResponse } from "./venmo-wallet-response.js";
/** The payment source used to fund the payment. */
export type OrderAuthorizeResponsePaymentSource = {
    /** The payment card to use to fund a payment. Card can be a credit or debit card. */
    card?: CardResponse;
    /** The PayPal Wallet response. */
    paypal?: PayPalWalletResponse;
    /** Information needed to pay using ApplePay. */
    applePay?: ApplePayPaymentObject;
    /** Google Pay Wallet payment data. */
    googlePay?: GooglePayWalletResponse;
    /** Venmo wallet response. */
    venmo?: VenmoWalletResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderAuthorizeResponsePaymentSourceInternalSchema: Schema<OrderAuthorizeResponsePaymentSource>;
export declare const orderAuthorizeResponsePaymentSourceSchema: Schema<OrderAuthorizeResponsePaymentSource>;
