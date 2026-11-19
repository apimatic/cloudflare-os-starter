import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type PricingTier } from "./pricing-tier.js";
import { type SubscriptionPricingModel } from "./subscription-pricing-model.js";
/** The pricing scheme details. */
export type SubscriptionPricingScheme = {
    /** The version of the pricing scheme. */
    version?: number;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    fixedPrice?: Money;
    /** The pricing model for tiered plan. The `tiers` parameter is required. */
    pricingModel?: SubscriptionPricingModel;
    /**
     * An array of pricing tiers which are used for billing volume/tiered plans. pricing_model field
     * has to be specified.
     */
    tiers?: PricingTier[];
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
export declare const subscriptionPricingSchemeInternalSchema: Schema<SubscriptionPricingScheme>;
export declare const subscriptionPricingSchemeSchema: Schema<SubscriptionPricingScheme>;
