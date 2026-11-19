import type { EnumSchema } from "../core/validation/schema.js";
/** The pricing model for tiered plan. The `tiers` parameter is required. */
export declare const SubscriptionPricingModel: {
    /** A volume pricing model. */
    readonly Volume: "VOLUME";
    /** A tiered pricing model. */
    readonly Tiered: "TIERED";
};
export type SubscriptionPricingModel = (typeof SubscriptionPricingModel)[keyof typeof SubscriptionPricingModel] | (string & {});
export declare const subscriptionPricingModelSchema: EnumSchema<SubscriptionPricingModel>;
