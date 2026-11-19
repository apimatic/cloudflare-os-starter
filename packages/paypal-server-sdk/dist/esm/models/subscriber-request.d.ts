import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Name } from "./name.js";
import { type PhoneWithTypeSubscriptions } from "./phone-with-type-subscriptions.js";
import { type ShippingDetailsSubscriptions } from "./shipping-details-subscriptions.js";
import { type SubscriptionPaymentSource } from "./subscription-payment-source.js";
/** The subscriber request information . */
export type SubscriberRequest = {
    /** The name of the party. */
    name?: Name;
    /** The phone information. */
    phone?: PhoneWithTypeSubscriptions;
    /** The shipping details. */
    shippingAddress?: ShippingDetailsSubscriptions;
    /**
     * The payment source definition. To be eligible to create subscription using debit or credit
     * card, you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp).
     * Please note, its available only for non-3DS cards and for merchants in US and AU regions.
     */
    paymentSource?: SubscriptionPaymentSource;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriberRequestInternalSchema: Schema<SubscriberRequest>;
export declare const subscriberRequestSchema: Schema<SubscriberRequest>;
