import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CycleExecution } from "./cycle-execution.js";
import { type FailedPaymentDetails } from "./failed-payment-details.js";
import { type LastPaymentDetails } from "./last-payment-details.js";
import { type Money } from "./money.js";
/**
 * The billing details for the subscription. If the subscription was or is active, these fields are
 * populated.
 */
export type SubscriptionBillingInformation = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    outstandingBalance: Money;
    /** The trial and regular billing executions. */
    cycleExecutions?: CycleExecution[];
    /** The details for the last payment. */
    lastPayment?: LastPaymentDetails;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    nextBillingTime?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    finalPaymentTime?: string;
    /**
     * The number of consecutive payment failures. Resets to `0` after a successful payment. If this
     * reaches the `payment_failure_threshold` value, the subscription updates to the `SUSPENDED`
     * state.
     */
    failedPaymentsCount: number;
    /** The details for the failed payment of the subscription. */
    lastFailedPayment?: FailedPaymentDetails;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionBillingInformationInternalSchema: Schema<SubscriptionBillingInformation>;
export declare const subscriptionBillingInformationSchema: Schema<SubscriptionBillingInformation>;
