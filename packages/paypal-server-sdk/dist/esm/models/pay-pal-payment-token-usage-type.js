import * as s from "../core/validation/index.js";
/** The usage type associated with the PayPal payment token. */
export const PayPalPaymentTokenUsageType = {
    /** The PayPal Payment Token will be used for future transaction directly with a merchant. */
    Merchant: "MERCHANT",
    /**
     * The PayPal Payment Token will be used for future transaction on a platform. A platform is
     * typically a marketplace or a channel that a payer can purchase goods and services from multiple
     * merchants.
     */
    Platform: "PLATFORM",
};
export const payPalPaymentTokenUsageTypeSchema = s.enumOf(PayPalPaymentTokenUsageType);
