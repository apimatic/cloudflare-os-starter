import type { JsonValue, Schema } from "../core/validation/schema.js";
/**
 * The details for the merchant who receives the funds and fulfills the order. The merchant is also
 * known as the payee.
 */
export type PayeeBase = {
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    emailAddress?: string;
    /** The account identifier for a PayPal account. */
    merchantId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payeeBaseInternalSchema: Schema<PayeeBase>;
export declare const payeeBaseSchema: Schema<PayeeBase>;
