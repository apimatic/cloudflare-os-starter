import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type DisputeCategory } from "./dispute-category.js";
import { type SellerProtectionStatus } from "./seller-protection-status.js";
/**
 * The level of protection offered as defined by [PayPal Seller Protection for
 * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
 */
export type SellerProtection = {
    /**
     * Indicates whether the transaction is eligible for seller protection. For information, see
     * [PayPal Seller Protection for
     * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
     */
    status?: SellerProtectionStatus;
    /** An array of conditions that are covered for the transaction. */
    disputeCategories?: DisputeCategory[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const sellerProtectionSchema: Schema<SellerProtection>;
