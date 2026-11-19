import type { EnumSchema } from "../core/validation/schema.js";
/**
 * Indicates whether the transaction is eligible for seller protection. For information, see [PayPal
 * Seller Protection for
 * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
 */
export declare const SellerProtectionStatus: {
    /**
     * Your PayPal balance remains intact if the customer claims that they did not receive an item or
     * the account holder claims that they did not authorize the payment.
     */
    readonly Eligible: "ELIGIBLE";
    /**
     * Your PayPal balance remains intact if the customer claims that they did not receive an item.
     */
    readonly PartiallyEligible: "PARTIALLY_ELIGIBLE";
    /** This transaction is not eligible for seller protection. */
    readonly NotEligible: "NOT_ELIGIBLE";
};
export type SellerProtectionStatus = (typeof SellerProtectionStatus)[keyof typeof SellerProtectionStatus] | (string & {});
export declare const sellerProtectionStatusSchema: EnumSchema<SellerProtectionStatus>;
