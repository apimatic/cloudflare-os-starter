import * as s from "../core/validation/index.js";
/** The pricing model for tiered plan. The `tiers` parameter is required. */
export const SubscriptionPricingModel = {
    /** A volume pricing model. */
    Volume: "VOLUME",
    /** A tiered pricing model. */
    Tiered: "TIERED",
};
export const subscriptionPricingModelSchema = s.enumOf(SubscriptionPricingModel);
//# sourceMappingURL=subscription-pricing-model.js.map