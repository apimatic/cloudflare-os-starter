import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
/** The breakdown details for the amount. Includes the gross, tax, fee, and shipping amounts. */
export type SubscriptionAmountWithBreakdown = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    grossAmount: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    totalItemAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    feeAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    taxAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    netAmount?: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionAmountWithBreakdownInternalSchema: Schema<SubscriptionAmountWithBreakdown>;
export declare const subscriptionAmountWithBreakdownSchema: Schema<SubscriptionAmountWithBreakdown>;
