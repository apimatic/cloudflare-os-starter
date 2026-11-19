import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The activate subscription request details. */
export type ActivateSubscriptionRequest = {
    /** The reason for activation of a subscription. Required to reactivate the subscription. */
    reason?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const activateSubscriptionRequestInternalSchema: Schema<ActivateSubscriptionRequest>;
export declare const activateSubscriptionRequestSchema: Schema<ActivateSubscriptionRequest>;
