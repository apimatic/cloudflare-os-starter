import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The currency and amount for a financial transaction, such as a balance or payment due. */
export type Money = {
    /**
     * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
     * identifies the currency.
     */
    currencyCode: string;
    /**
     * The value, which might be: An integer for currencies like `JPY` that are not typically
     * fractional. A decimal fraction for currencies like `TND` that are subdivided into thousandths.
     * For the required number of decimal places for a currency code, see [Currency
     * Codes](/api/rest/reference/currency-codes/).
     */
    value: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const moneyInternalSchema: Schema<Money>;
export declare const moneySchema: Schema<Money>;
