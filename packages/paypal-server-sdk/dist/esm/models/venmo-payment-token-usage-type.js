import * as s from "../core/validation/index.js";
/** The usage type associated with the Venmo payment token. */
export const VenmoPaymentTokenUsageType = {
    /** The Venmo Payment Token will be used for future transaction directly with a merchant. */
    Merchant: "MERCHANT",
    /**
     * The Venmo Payment Token will be used for future transaction on a platform. A platform is
     * typically a marketplace or a channel that a payer can purchase goods and services from multiple
     * merchants.
     */
    Platform: "PLATFORM",
};
export const venmoPaymentTokenUsageTypeSchema = s.enumOf(VenmoPaymentTokenUsageType);
//# sourceMappingURL=venmo-payment-token-usage-type.js.map