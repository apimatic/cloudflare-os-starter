import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type NetAmountBreakdownItem } from "./net-amount-breakdown-item.js";
import { type PlatformFee } from "./platform-fee.js";
/** The breakdown of the refund. */
export type SellerPayableBreakdown = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    grossAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    paypalFee?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    paypalFeeInReceivableCurrency?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    netAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    netAmountInReceivableCurrency?: Money;
    /** An array of platform or partner fees, commissions, or brokerage fees for the refund. */
    platformFees?: PlatformFee[];
    /**
     * An array of breakdown values for the net amount. Returned when the currency of the refund is
     * different from the currency of the PayPal account where the payee holds their funds.
     */
    netAmountBreakdown?: NetAmountBreakdownItem[];
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    totalRefundedAmount?: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const sellerPayableBreakdownInternalSchema: Schema<SellerPayableBreakdown>;
export declare const sellerPayableBreakdownSchema: Schema<SellerPayableBreakdown>;
