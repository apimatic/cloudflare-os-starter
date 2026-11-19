import type { JsonValue, Schema } from "../core/validation/schema.js";
/**
 * The date and time stamps that are common to authorized payment, captured payment, and refund
 * transactions.
 */
export type ActivityTimestamps = {
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    createTime?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    updateTime?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const activityTimestampsInternalSchema: Schema<ActivityTimestamps>;
export declare const activityTimestampsSchema: Schema<ActivityTimestamps>;
