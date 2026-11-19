import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type Money } from "./money.js";
import { type PlanDetails } from "./plan-details.js";
import { type Status } from "./status.js";
import { type Subscriber } from "./subscriber.js";
import { type SubscriptionBillingInformation } from "./subscription-billing-information.js";
/** The subscription details. */
export type Subscription = {
    /** The status of the subscription. */
    status?: Status;
    /** The reason or notes for the status of the subscription. */
    statusChangeNote?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    statusUpdateTime?: string;
    /** The PayPal-generated ID for the subscription. */
    id?: string;
    /** The ID of the plan. */
    planId?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    startTime?: string;
    /** The quantity of the product in the subscription. */
    quantity?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingAmount?: Money;
    /** The subscriber response information. */
    subscriber?: Subscriber;
    /**
     * The billing details for the subscription. If the subscription was or is active, these fields
     * are populated.
     */
    billingInfo?: SubscriptionBillingInformation;
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
    /** The custom id for the subscription. Can be invoice id. */
    customId?: string;
    /** Indicates whether the subscription has overridden any plan attributes. */
    planOverridden?: boolean;
    /** The plan details. */
    plan?: PlanDetails;
    /**
     * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionInternalSchema: Schema<Subscription>;
export declare const subscriptionSchema: Schema<Subscription>;
