import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type MoneyTransactionSearch } from "./money-transaction-search.js";
/** The tax levied by a government on the purchase of goods or services. */
export type TaxAmount = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    taxAmount?: MoneyTransactionSearch;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const taxAmountInternalSchema: Schema<TaxAmount>;
export declare const taxAmountSchema: Schema<TaxAmount>;
