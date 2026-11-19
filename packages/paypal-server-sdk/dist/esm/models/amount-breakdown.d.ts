import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
/**
 * The breakdown of the amount. Breakdown provides details such as total item amount, total tax
 * amount, shipping, handling, insurance, and discounts, if any.
 */
export type AmountBreakdown = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    itemTotal?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shipping?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    handling?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    taxTotal?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    insurance?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingDiscount?: Money;
    /**
     * The discount amount and currency code. For list of supported currencies and decimal precision,
     * see the PayPal REST APIs Currency Codes.
     */
    discount?: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const amountBreakdownInternalSchema: Schema<AmountBreakdown>;
export declare const amountBreakdownSchema: Schema<AmountBreakdown>;
