import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Status } from "./status.js";
/** The subscription status details. */
export type SubscriptionStatus = {
    /** The status of the subscription. */
    status?: Status;
    /** The reason or notes for the status of the subscription. */
    statusChangeNote?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    statusUpdateTime?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionStatusInternalSchema: Schema<SubscriptionStatus>;
export declare const subscriptionStatusSchema: Schema<SubscriptionStatus>;
