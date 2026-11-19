import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The tenure type of the billing cycle. In case of a plan having trial cycle, only 2 trial cycles
 * are allowed per plan.
 */
export declare const TenureTypeSubscriptions: {
    /** A regular billing cycle. */
    readonly Regular: "REGULAR";
    /** A trial billing cycle. */
    readonly Trial: "TRIAL";
};
export type TenureTypeSubscriptions = (typeof TenureTypeSubscriptions)[keyof typeof TenureTypeSubscriptions] | (string & {});
export declare const tenureTypeSubscriptionsSchema: EnumSchema<TenureTypeSubscriptions>;
