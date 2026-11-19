import type { EnumSchema } from "../core/validation/schema.js";
/** The tokenization method that generated the ID. */
export declare const TokenType: {
    /**
     * The PayPal billing agreement ID. References an approved recurring payment for goods or
     * services.
     */
    readonly BillingAgreement: "BILLING_AGREEMENT";
};
export type TokenType = (typeof TokenType)[keyof typeof TokenType] | (string & {});
export declare const tokenTypeSchema: EnumSchema<TokenType>;
