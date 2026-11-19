import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Frequency } from "./frequency.js";
import { type SubscriptionPricingScheme } from "./subscription-pricing-scheme.js";
import { type TenureTypeSubscriptions } from "./tenure-type-subscriptions.js";
/** The billing cycle details. */
export type SubscriptionBillingCycle = {
    /** The pricing scheme details. */
    pricingScheme?: SubscriptionPricingScheme;
    /** The frequency of the billing cycle. */
    frequency: Frequency;
    /**
     * The tenure type of the billing cycle. In case of a plan having trial cycle, only 2 trial cycles
     * are allowed per plan.
     */
    tenureType: TenureTypeSubscriptions;
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
     *
     * @default 1
     */
    totalCycles?: number;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionBillingCycleInternalSchema: Schema<SubscriptionBillingCycle>;
export declare const subscriptionBillingCycleSchema: Schema<SubscriptionBillingCycle>;
