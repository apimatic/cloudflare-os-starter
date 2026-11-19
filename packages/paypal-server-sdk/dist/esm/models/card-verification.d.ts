import type { JsonValue, Schema } from "../core/validation/schema.js";
import { OrdersCardVerificationMethod } from "./orders-card-verification-method.js";
/**
 * The API caller can opt in to verify the card through PayPal offered verification services (e.g.
 * Smart Dollar Auth, 3DS).
 */
export type CardVerification = {
    /**
     * The method used for card verification.
     *
     * @default OrdersCardVerificationMethod.ScaWhenRequired
     */
    method?: OrdersCardVerificationMethod;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardVerificationSchema: Schema<CardVerification>;
