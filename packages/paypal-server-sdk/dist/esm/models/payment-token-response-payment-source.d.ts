import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayPaymentToken } from "./apple-pay-payment-token.js";
import { type CardPaymentTokenEntity } from "./card-payment-token-entity.js";
import { type PayPalPaymentToken } from "./pay-pal-payment-token.js";
import { type VenmoPaymentToken } from "./venmo-payment-token.js";
/** The vaulted payment method details. */
export type PaymentTokenResponsePaymentSource = {
    /** Full representation of a Card Payment Token including network token. */
    card?: CardPaymentTokenEntity;
    /** Full representation of a PayPal Payment Token. */
    paypal?: PayPalPaymentToken;
    /** Full representation of a Venmo Payment Token. */
    venmo?: VenmoPaymentToken;
    /** A resource representing a response for Apple Pay. */
    applePay?: ApplePayPaymentToken;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentTokenResponsePaymentSourceInternalSchema: Schema<PaymentTokenResponsePaymentSource>;
export declare const paymentTokenResponsePaymentSourceSchema: Schema<PaymentTokenResponsePaymentSource>;
