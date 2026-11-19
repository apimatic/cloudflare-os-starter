import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type MerchantPreferences } from "./merchant-preferences.js";
import { type PaymentPreferences } from "./payment-preferences.js";
import { type SubscriptionBillingCycle } from "./subscription-billing-cycle.js";
import { type Taxes } from "./taxes.js";
/** The plan details. */
export type PlanDetails = {
    /** The ID for the product. */
    productId?: string;
    /** The plan name. */
    name?: string;
    /** The detailed description of the plan. */
    description?: string;
    /**
     * An array of billing cycles for trial billing and regular billing. A plan can have at most two
     * trial cycles and only one regular cycle.
     */
    billingCycles?: SubscriptionBillingCycle[];
    /** The payment preferences for a subscription. */
    paymentPreferences?: PaymentPreferences;
    /** The merchant preferences for a subscription. */
    merchantPreferences?: MerchantPreferences;
    /** The tax details. */
    taxes?: Taxes;
    /**
     * Indicates whether you can subscribe to this plan by providing a quantity for the goods or
     * service.
     *
     * @default false
     */
    quantitySupported?: boolean;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const planDetailsInternalSchema: Schema<PlanDetails>;
export declare const planDetailsSchema: Schema<PlanDetails>;
