import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The currency and amount for a financial transaction, such as a balance or payment due. */
export type MoneyTransactionSearch = {
    /**
     * The [three-character ISO-4217 currency code](/docs/integration/direct/rest/currency-codes/)
     * that identifies the currency.
     */
    currencyCode: string;
    /**
     * The value, which might be: An integer for currencies like `JPY` that are not typically
     * fractional. A decimal fraction for currencies like `TND` that are subdivided into thousandths.
     * For the required number of decimal places for a currency code, see [Currency
     * Codes](/docs/integration/direct/rest/currency-codes/).
     */
    value: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const moneyTransactionSearchInternalSchema: Schema<MoneyTransactionSearch>;
export declare const moneyTransactionSearchSchema: Schema<MoneyTransactionSearch>;
