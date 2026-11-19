import * as s from "../core/validation/index.js";
/** The tokenization method that generated the ID. */
export const TokenType = {
    /**
     * The PayPal billing agreement ID. References an approved recurring payment for goods or
     * services.
     */
    BillingAgreement: "BILLING_AGREEMENT",
};
export const tokenTypeSchema = s.enumOf(TokenType);
