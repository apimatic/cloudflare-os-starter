import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BillingCycleOverride } from "./billing-cycle-override.js";
import { type PaymentPreferencesOverride } from "./payment-preferences-override.js";
import { type TaxesOverride } from "./taxes-override.js";
/**
 * An inline plan object to customise the subscription. You can override plan level default
 * attributes by providing customised values for the subscription in this object.
 */
export type PlanOverride = {
    /**
     * An array of billing cycles for trial billing and regular billing. The subscription billing
     * cycle definition has to adhere to the plan billing cycle definition.
     */
    billingCycles?: BillingCycleOverride[];
    /** The payment preferences to override at subscription level. */
    paymentPreferences?: PaymentPreferencesOverride;
    /** The tax details. */
    taxes?: TaxesOverride;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const planOverrideInternalSchema: Schema<PlanOverride>;
export declare const planOverrideSchema: Schema<PlanOverride>;
