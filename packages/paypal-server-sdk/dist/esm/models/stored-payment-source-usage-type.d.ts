import type { EnumSchema } from "../core/validation/schema.js";
/**
 * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also
 * referred to as stored credential or card on file).
 */
export declare const StoredPaymentSourceUsageType: {
    /**
     * Indicates the Initial/First payment with a payment_source that is intended to be stored upon
     * successful processing of the payment.
     */
    readonly First: "FIRST";
    /**
     * Indicates a payment using a stored payment_source which has been successfully used previously
     * for a payment.
     */
    readonly Subsequent: "SUBSEQUENT";
    /**
     * Indicates that PayPal will derive the value of `FIRST` or `SUBSEQUENT` based on data available
     * to PayPal.
     */
    readonly Derived: "DERIVED";
};
export type StoredPaymentSourceUsageType = (typeof StoredPaymentSourceUsageType)[keyof typeof StoredPaymentSourceUsageType] | (string & {});
export declare const storedPaymentSourceUsageTypeSchema: EnumSchema<StoredPaymentSourceUsageType>;
