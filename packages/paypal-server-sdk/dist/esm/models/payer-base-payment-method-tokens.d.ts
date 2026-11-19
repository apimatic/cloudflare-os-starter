import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The customer who approves and pays for the order. The customer is also known as the payer. */
export type PayerBasePaymentMethodTokens = {
    /**
     * The internationalized email address.<blockquote><strong>Note:</strong> Up to 64 characters are
     * allowed before and 255 characters are allowed after the <code>@</code> sign. However, the
     * generally accepted maximum length for an email address is 254 characters. The pattern verifies
     * that an unquoted <code>@</code> sign exists.</blockquote>
     */
    emailAddress?: string;
    /** The account identifier for a PayPal account. */
    payerId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payerBasePaymentMethodTokensInternalSchema: Schema<PayerBasePaymentMethodTokens>;
export declare const payerBasePaymentMethodTokensSchema: Schema<PayerBasePaymentMethodTokens>;
