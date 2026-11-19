import type { EnumSchema } from "../core/validation/schema.js";
/** The pricing model for the billing cycle. */
export declare const PricingModel: {
    /** A fixed pricing scheme where the customer is charged a fixed amount. */
    readonly Fixed: "FIXED";
    /** A variable pricing scheme where the customer is charged a variable amount. */
    readonly Variable: "VARIABLE";
    /** A auto-reload pricing scheme where the customer is charged a fixed amount for reload. */
    readonly AutoReload: "AUTO_RELOAD";
};
export type PricingModel = (typeof PricingModel)[keyof typeof PricingModel] | (string & {});
export declare const pricingModelSchema: EnumSchema<PricingModel>;
