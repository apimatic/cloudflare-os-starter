import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BillingCycle } from "./billing-cycle.js";
import { type OneTimeCharge } from "./one-time-charge.js";
/** The merchant level Recurring Billing plan metadata for the Billing Agreement. */
export type Plan = {
    /**
     * An array of billing cycles for trial billing and regular billing. A plan can have at most two
     * trial cycles and only one regular cycle.
     */
    billingCycles: BillingCycle[];
    /** The one-time charge info at the time of checkout. */
    oneTimeCharges: OneTimeCharge;
    /** Name of the recurring plan. */
    name?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const planInternalSchema: Schema<Plan>;
export declare const planSchema: Schema<Plan>;
