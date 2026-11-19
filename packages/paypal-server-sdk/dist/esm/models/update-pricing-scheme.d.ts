import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type SubscriptionPricingScheme } from "./subscription-pricing-scheme.js";
/** The update pricing scheme request details. */
export type UpdatePricingScheme = {
    /** The billing cycle sequence. */
    billingCycleSequence: number;
    /** The pricing scheme details. */
    pricingScheme: SubscriptionPricingScheme;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const updatePricingSchemeInternalSchema: Schema<UpdatePricingScheme>;
export declare const updatePricingSchemeSchema: Schema<UpdatePricingScheme>;
