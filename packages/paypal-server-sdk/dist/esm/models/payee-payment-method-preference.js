import * as s from "../core/validation/index.js";
/** The merchant-preferred payment methods. */
export const PayeePaymentMethodPreference = {
    /** Accepts any type of payment from the customer. */
    Unrestricted: "UNRESTRICTED",
    /**
     * Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or
     * instant ACH. Ensures that at the time of capture, the payment does not have the `pending`
     * status.
     */
    ImmediatePaymentRequired: "IMMEDIATE_PAYMENT_REQUIRED",
};
export const payeePaymentMethodPreferenceSchema = s.enumOf(PayeePaymentMethodPreference);
//# sourceMappingURL=payee-payment-method-preference.js.map