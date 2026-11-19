import type { JsonValue, Schema } from "../core/validation/schema.js";
/**
 * The exchange rate that determines the amount to convert from one currency to another currency.
 */
export type ExchangeRate = {
    /**
     * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
     * identifies the currency.
     */
    sourceCurrency?: string;
    /**
     * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
     * identifies the currency.
     */
    targetCurrency?: string;
    /**
     * The target currency amount. Equivalent to one unit of the source currency. Formatted as integer
     * or decimal value with one to 15 digits to the right of the decimal point.
     */
    value?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const exchangeRateInternalSchema: Schema<ExchangeRate>;
export declare const exchangeRateSchema: Schema<ExchangeRate>;
