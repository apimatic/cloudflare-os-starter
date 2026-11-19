import type { EnumSchema } from "../core/validation/schema.js";
/** The merchant-preferred payment methods. */
export declare const PayeePaymentMethodPreference: {
    /** Accepts any type of payment from the customer. */
    readonly Unrestricted: "UNRESTRICTED";
    /**
     * Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or
     * instant ACH. Ensures that at the time of capture, the payment does not have the `pending`
     * status.
     */
    readonly ImmediatePaymentRequired: "IMMEDIATE_PAYMENT_REQUIRED";
};
export type PayeePaymentMethodPreference = (typeof PayeePaymentMethodPreference)[keyof typeof PayeePaymentMethodPreference] | (string & {});
export declare const payeePaymentMethodPreferenceSchema: EnumSchema<PayeePaymentMethodPreference>;
