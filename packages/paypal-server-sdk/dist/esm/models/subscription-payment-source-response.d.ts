import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CardResponseWithBillingAddress } from "./card-response-with-billing-address.js";
/** The payment source used to fund the payment. */
export type SubscriptionPaymentSourceResponse = {
    /** The payment card used to fund the payment. Card can be a credit or debit card. */
    card?: CardResponseWithBillingAddress;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionPaymentSourceResponseInternalSchema: Schema<SubscriptionPaymentSourceResponse>;
export declare const subscriptionPaymentSourceResponseSchema: Schema<SubscriptionPaymentSourceResponse>;
