import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CaptureStatus } from "./capture-status.js";
import { type SubscriptionAmountWithBreakdown } from "./subscription-amount-with-breakdown.js";
import { type SubscriptionPayerName } from "./subscription-payer-name.js";
/** The transaction details. */
export type SubscriptionTransactionDetails = {
    /** The status of the captured payment. */
    status?: CaptureStatus;
    /** The PayPal-generated transaction ID. */
    id: string;
    /** The breakdown details for the amount. Includes the gross, tax, fee, and shipping amounts. */
    amountWithBreakdown: SubscriptionAmountWithBreakdown;
    /** The name of the party. */
    payerName?: SubscriptionPayerName;
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    payerEmail?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    time: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionTransactionDetailsInternalSchema: Schema<SubscriptionTransactionDetails>;
export declare const subscriptionTransactionDetailsSchema: Schema<SubscriptionTransactionDetails>;
