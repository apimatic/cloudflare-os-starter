import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BillingCycle } from "./billing-cycle.js";
import { type Money } from "./money.js";
/**
 * Metadata for merchant-managed recurring billing plans. Valid only during the saved payment method
 * token or billing agreement creation.
 */
export type OrderBillingPlan = {
    /**
     * An array of billing cycles for trial billing and regular billing. A plan can have at most two
     * trial cycles and only one regular cycle.
     */
    billingCycles: BillingCycle[];
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    setupFee?: Money;
    /** Name of the recurring plan. */
    name?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderBillingPlanInternalSchema: Schema<OrderBillingPlan>;
export declare const orderBillingPlanSchema: Schema<OrderBillingPlan>;
