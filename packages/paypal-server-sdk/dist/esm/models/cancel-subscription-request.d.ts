import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The cancel subscription request details. */
export type CancelSubscriptionRequest = {
    /** The reason for the cancellation of a subscription. */
    reason: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cancelSubscriptionRequestInternalSchema: Schema<CancelSubscriptionRequest>;
export declare const cancelSubscriptionRequestSchema: Schema<CancelSubscriptionRequest>;
