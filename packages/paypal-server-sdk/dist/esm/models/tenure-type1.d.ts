import type { EnumSchema } from "../core/validation/schema.js";
/** The type of the billing cycle. */
export declare const TenureType1: {
    /** A regular billing cycle. */
    readonly Regular: "REGULAR";
    /** A trial billing cycle. */
    readonly Trial: "TRIAL";
};
export type TenureType1 = (typeof TenureType1)[keyof typeof TenureType1] | (string & {});
export declare const tenureType1Schema: EnumSchema<TenureType1>;
