import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type IntervalUnit } from "./interval-unit.js";
/** The frequency of the billing cycle. */
export type Frequency = {
    /** The interval at which the subscription is charged or billed. */
    intervalUnit: IntervalUnit;
    /**
     * The number of intervals after which a subscriber is billed. For example, if the `interval_unit`
     * is `DAY` with an `interval_count` of `2`, the subscription is billed once every two days. The
     * following table lists the maximum allowed values for the `interval_count` for each
     * `interval_unit`: Interval unit Maximum interval count DAY 365 WEEK 52 MONTH 12 YEAR 1
     *
     * @default 1
     */
    intervalCount?: number;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const frequencyInternalSchema: Schema<Frequency>;
export declare const frequencySchema: Schema<Frequency>;
