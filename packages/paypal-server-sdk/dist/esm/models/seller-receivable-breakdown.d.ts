import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ExchangeRate } from "./exchange-rate.js";
import { type Money } from "./money.js";
import { type PlatformFee } from "./platform-fee.js";
/**
 * The detailed breakdown of the capture activity. This is not available for transactions that are
 * in pending state.
 */
export type SellerReceivableBreakdown = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    grossAmount: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    paypalFee?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    paypalFeeInReceivableCurrency?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    netAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    receivableAmount?: Money;
    /**
     * The exchange rate that determines the amount to convert from one currency to another currency.
     */
    exchangeRate?: ExchangeRate;
    /**
     * An array of platform or partner fees, commissions, or brokerage fees that associated with the
     * captured payment.
     */
    platformFees?: PlatformFee[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const sellerReceivableBreakdownInternalSchema: Schema<SellerReceivableBreakdown>;
export declare const sellerReceivableBreakdownSchema: Schema<SellerReceivableBreakdown>;
