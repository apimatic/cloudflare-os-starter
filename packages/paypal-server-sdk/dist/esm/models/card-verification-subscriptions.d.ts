import type { JsonValue, Schema } from "../core/validation/schema.js";
import { SubscriptionCardVerificationMethod } from "./subscription-card-verification-method.js";
/**
 * The API caller can opt in to verify the card through PayPal offered verification services (e.g.
 * Smart Dollar Auth, 3DS).
 */
export type CardVerificationSubscriptions = {
    /**
     * The method used for card verification.
     *
     * @default SubscriptionCardVerificationMethod.ScaWhenRequired
     */
    method?: SubscriptionCardVerificationMethod;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardVerificationSubscriptionsSchema: Schema<CardVerificationSubscriptions>;
