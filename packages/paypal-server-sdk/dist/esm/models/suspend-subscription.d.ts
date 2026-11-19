import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The suspend subscription request details. */
export type SuspendSubscription = {
    /** The reason for suspension of the Subscription. */
    reason: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const suspendSubscriptionInternalSchema: Schema<SuspendSubscription>;
export declare const suspendSubscriptionSchema: Schema<SuspendSubscription>;
