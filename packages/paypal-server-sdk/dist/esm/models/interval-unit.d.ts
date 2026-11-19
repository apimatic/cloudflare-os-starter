import type { EnumSchema } from "../core/validation/schema.js";
/** The interval at which the subscription is charged or billed. */
export declare const IntervalUnit: {
    /** A daily billing cycle. */
    readonly Day: "DAY";
    /** A weekly billing cycle. */
    readonly Week: "WEEK";
    /** A monthly billing cycle. */
    readonly Month: "MONTH";
    /** A yearly billing cycle. */
    readonly Year: "YEAR";
};
export type IntervalUnit = (typeof IntervalUnit)[keyof typeof IntervalUnit] | (string & {});
export declare const intervalUnitSchema: EnumSchema<IntervalUnit>;
