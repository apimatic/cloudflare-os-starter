import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type MoneyTransactionSearch } from "./money-transaction-search.js";
/** The Balance information. */
export type BalanceInformation = {
    /**
     * The [three-character ISO-4217 currency code](/docs/integration/direct/rest/currency-codes/)
     * that identifies the currency.
     */
    currency: string;
    /** Optional field representing if the currency is primary currency or not. */
    primary?: boolean;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    totalBalance: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    availableBalance?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    withheldBalance?: MoneyTransactionSearch;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const balanceInformationInternalSchema: Schema<BalanceInformation>;
export declare const balanceInformationSchema: Schema<BalanceInformation>;
