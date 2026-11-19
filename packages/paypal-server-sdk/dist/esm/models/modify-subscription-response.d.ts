import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type Money } from "./money.js";
import { type PlanOverride } from "./plan-override.js";
import { type ShippingDetailsSubscriptions } from "./shipping-details-subscriptions.js";
/**
 * The response to a request to update the quantity of the product or service in a subscription. You
 * can also use this method to switch the plan and update the `shipping_amount` and
 * `shipping_address` values for the subscription. This type of update requires the buyer's consent.
 */
export type ModifySubscriptionResponse = {
    /** The unique PayPal-generated ID for the plan. */
    planId?: string;
    /** The quantity of the product or service in the subscription. */
    quantity?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingAmount?: Money;
    /** The shipping details. */
    shippingAddress?: ShippingDetailsSubscriptions;
    /**
     * An inline plan object to customise the subscription. You can override plan level default
     * attributes by providing customised values for the subscription in this object.
     */
    plan?: PlanOverride;
    /** Indicates whether the subscription has overridden any plan attributes. */
    planOverridden?: boolean;
    /**
     * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const modifySubscriptionResponseInternalSchema: Schema<ModifySubscriptionResponse>;
export declare const modifySubscriptionResponseSchema: Schema<ModifySubscriptionResponse>;
