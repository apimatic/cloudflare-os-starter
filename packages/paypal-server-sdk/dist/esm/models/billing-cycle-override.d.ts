import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type SubscriptionPricingScheme } from "./subscription-pricing-scheme.js";
/**
 * The billing cycle details to override at subscription level. The subscription billing cycle
 * definition has to adhere to the plan billing cycle definition.
 */
export type BillingCycleOverride = {
    /** The pricing scheme details. */
    pricingScheme?: SubscriptionPricingScheme;
    /**
     * The order in which this cycle is to run among other billing cycles. For example, a trial
     * billing cycle has a `sequence` of `1` while a regular billing cycle has a `sequence` of `2`, so
     * that trial cycle runs before the regular cycle.
     */
    sequence: number;
    /**
     * The number of times this billing cycle gets executed. Trial billing cycles can only be executed
     * a finite number of times (value between 1 and 999 for total_cycles). Regular billing cycles can
     * be executed infinite times (value of 0 for total_cycles) or a finite number of times (value
     * between 1 and 999 for total_cycles).
     */
    totalCycles?: number;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const billingCycleOverrideInternalSchema: Schema<BillingCycleOverride>;
export declare const billingCycleOverrideSchema: Schema<BillingCycleOverride>;
