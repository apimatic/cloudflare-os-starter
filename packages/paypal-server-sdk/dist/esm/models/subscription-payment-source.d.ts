import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type SubscriptionCardRequest } from "./subscription-card-request.js";
/**
 * The payment source definition. To be eligible to create subscription using debit or credit card,
 * you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp). Please note,
 * its available only for non-3DS cards and for merchants in US and AU regions.
 */
export type SubscriptionPaymentSource = {
    /** The payment card to use to fund a payment. Can be a credit or debit card. */
    card?: SubscriptionCardRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionPaymentSourceInternalSchema: Schema<SubscriptionPaymentSource>;
export declare const subscriptionPaymentSourceSchema: Schema<SubscriptionPaymentSource>;
