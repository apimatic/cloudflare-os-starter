import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type PlanOverride } from "./plan-override.js";
import { type ShippingDetailsSubscriptions } from "./shipping-details-subscriptions.js";
import { type SubscriptionPatchApplicationContext } from "./subscription-patch-application-context.js";
/**
 * The request to update the quantity of the product or service in a subscription. You can also use
 * this method to switch the plan and update the `shipping_amount` and `shipping_address` values for
 * the subscription. This type of update requires the buyer's consent.
 */
export type ModifySubscriptionRequest = {
    /** The unique PayPal-generated ID for the plan. */
    planId?: string;
    /** The quantity of the product or service in the subscription. */
    quantity?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingAmount?: Money;
    /** The shipping details. */
    shippingAddress?: ShippingDetailsSubscriptions;
    /**
     * The application context, which customizes the payer experience during the subscription approval
     * process with PayPal.
     */
    applicationContext?: SubscriptionPatchApplicationContext;
    /**
     * An inline plan object to customise the subscription. You can override plan level default
     * attributes by providing customised values for the subscription in this object.
     */
    plan?: PlanOverride;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const modifySubscriptionRequestInternalSchema: Schema<ModifySubscriptionRequest>;
export declare const modifySubscriptionRequestSchema: Schema<ModifySubscriptionRequest>;
