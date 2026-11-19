import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type Money } from "./money.js";
import { type PayeeBase } from "./payee-base.js";
import { type RefundStatusDetails } from "./refund-status-details.js";
import { type RefundStatus } from "./refund-status.js";
import { type SellerPayableBreakdown } from "./seller-payable-breakdown.js";
/** The refund information. */
export type Refund = {
    /** The status of the refund. */
    status?: RefundStatus;
    /** The details of the refund status. */
    statusDetails?: RefundStatusDetails;
    /** The PayPal-generated ID for the refund. */
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
    /**
     * Reference ID issued for the card transaction. This ID can be used to track the transaction
     * across processors, card brands and issuing banks.
     */
    acquirerReferenceNumber?: string;
    /**
     * The reason for the refund. Appears in both the payer's transaction history and the emails that
     * the payer receives.
     */
    noteToPayer?: string;
    /** The breakdown of the refund. */
    sellerPayableBreakdown?: SellerPayableBreakdown;
    /**
     * The details for the merchant who receives the funds and fulfills the order. The merchant is
     * also known as the payee.
     */
    payer?: PayeeBase;
    /** An array of related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links). */
    links?: LinkDescription[];
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
export declare const refundInternalSchema: Schema<Refund>;
export declare const refundSchema: Schema<Refund>;
