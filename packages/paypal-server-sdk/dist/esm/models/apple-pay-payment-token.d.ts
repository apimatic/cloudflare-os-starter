import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayCard } from "./apple-pay-card.js";
/** A resource representing a response for Apple Pay. */
export type ApplePayPaymentToken = {
    /** The payment card to be used to fund a payment. Can be a credit or debit card. */
    card?: ApplePayCard;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const applePayPaymentTokenInternalSchema: Schema<ApplePayPaymentToken>;
export declare const applePayPaymentTokenSchema: Schema<ApplePayPaymentToken>;
