import * as s from "../core/validation/index.js";
/** The usage type associated with a digital wallet payment token. */
export const UsageType = {
    /** The PayPal Payment Token will be used for future transaction directly with a merchant. */
    Merchant: "MERCHANT",
    /**
     * The PayPal Payment Token will be used for future transaction on a platform. A platform is
     * typically a marketplace or a channel that a payer can purchase goods and services from multiple
     * merchants.
     */
    Platform: "PLATFORM",
};
export const usageTypeSchema = s.enumOf(UsageType);
//# sourceMappingURL=usage-type.js.map