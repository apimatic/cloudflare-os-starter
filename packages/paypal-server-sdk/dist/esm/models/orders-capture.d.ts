import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CaptureStatusDetails } from "./capture-status-details.js";
import { type CaptureStatus } from "./capture-status.js";
import { DisbursementMode } from "./disbursement-mode.js";
import { type LinkDescription } from "./link-description.js";
import { type Money } from "./money.js";
import { type NetworkTransaction } from "./network-transaction.js";
import { type ProcessorResponse } from "./processor-response.js";
import { type SellerProtection } from "./seller-protection.js";
import { type SellerReceivableBreakdown } from "./seller-receivable-breakdown.js";
/** A captured payment. */
export type OrdersCapture = {
    /** The status of the captured payment. */
    status?: CaptureStatus;
    /** The details of the captured payment status. */
    statusDetails?: CaptureStatusDetails;
    /** The PayPal-generated ID for the captured payment. */
    id?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount?: Money;
    /**
     * The API caller-provided external invoice number for this order. Appears in both the payer's
     * transaction history and the emails that the payer receives.
     */
    invoiceId?: string;
    /**
     * The API caller-provided external ID. Used to reconcile API caller-initiated transactions with
     * PayPal transactions. Appears in transaction and settlement reports.
     */
    customId?: string;
    /** Reference values used by the card network to identify a transaction. */
    networkTransactionReference?: NetworkTransaction;
    /**
     * The level of protection offered as defined by [PayPal Seller Protection for
     * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
     */
    sellerProtection?: SellerProtection;
    /**
     * Indicates whether you can make additional captures against the authorized payment. Set to
     * `true` if you do not intend to capture additional payments against the authorization. Set to
     * `false` if you intend to capture additional payments against the authorization.
     *
     * @default false
     */
    finalCapture?: boolean;
    /**
     * The detailed breakdown of the capture activity. This is not available for transactions that are
     * in pending state.
     */
    sellerReceivableBreakdown?: SellerReceivableBreakdown;
    /** The funds that are held on behalf of the merchant. @default DisbursementMode.Instant */
    disbursementMode?: DisbursementMode;
    /** An array of related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links). */
    links?: LinkDescription[];
    /**
     * The processor response information for payment requests, such as direct credit card
     * transactions.
     */
    processorResponse?: ProcessorResponse;
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
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const ordersCaptureInternalSchema: Schema<OrdersCapture>;
export declare const ordersCaptureSchema: Schema<OrdersCapture>;
