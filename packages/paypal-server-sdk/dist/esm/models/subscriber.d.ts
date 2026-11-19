import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Name } from "./name.js";
import { type ShippingDetailsSubscriptions } from "./shipping-details-subscriptions.js";
import { type SubscriptionPaymentSourceResponse } from "./subscription-payment-source-response.js";
/** The subscriber response information. */
export type Subscriber = {
    /** The name of the party. */
    name?: Name;
    /** The shipping details. */
    shippingAddress?: ShippingDetailsSubscriptions;
    /** The payment source used to fund the payment. */
    paymentSource?: SubscriptionPaymentSourceResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriberInternalSchema: Schema<Subscriber>;
export declare const subscriberSchema: Schema<Subscriber>;
