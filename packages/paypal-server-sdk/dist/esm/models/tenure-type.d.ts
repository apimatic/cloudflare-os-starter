import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The tenure type of the billing cycle identifies if the billing cycle is a trial(free or
 * discounted) or regular billing cycle.
 */
export declare const TenureType: {
    /** A regular billing cycle to identify recurring charges for the billing agreement. */
    readonly Regular: "REGULAR";
    /**
     * A trial billing cycle to identify free or discounted charge for the billing agreement. Free
     * trails will not have a price object in pricing scheme where as a discounted trial would have a
     * discounted price compared to regular billing cycle.
     */
    readonly Trial: "TRIAL";
};
export type TenureType = (typeof TenureType)[keyof typeof TenureType] | (string & {});
export declare const tenureTypeSchema: EnumSchema<TenureType>;
