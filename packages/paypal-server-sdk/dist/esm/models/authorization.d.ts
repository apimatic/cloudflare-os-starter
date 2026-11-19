import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AuthorizationStatusDetails } from "./authorization-status-details.js";
import { type AuthorizationStatus } from "./authorization-status.js";
import { type LinkDescription } from "./link-description.js";
import { type Money } from "./money.js";
import { type NetworkTransaction } from "./network-transaction.js";
import { type SellerProtection } from "./seller-protection.js";
/** The authorized payment transaction. */
export type Authorization = {
    /** The status for the authorized payment. */
    status?: AuthorizationStatus;
    /** The details of the authorized payment status. */
    statusDetails?: AuthorizationStatusDetails;
    /** The PayPal-generated ID for the authorized payment. */
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
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    expirationTime?: string;
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
export declare const authorizationInternalSchema: Schema<Authorization>;
export declare const authorizationSchema: Schema<Authorization>;
