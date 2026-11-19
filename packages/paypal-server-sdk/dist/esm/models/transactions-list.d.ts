import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type SubscriptionTransactionDetails } from "./subscription-transaction-details.js";
/** The list transactions for a subscription request details. */
export type TransactionsList = {
    /** An array of transactions. */
    transactions?: SubscriptionTransactionDetails[];
    /** The total number of items. */
    totalItems?: number;
    /** The total number of pages. */
    totalPages?: number;
    /**
     * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const transactionsListInternalSchema: Schema<TransactionsList>;
export declare const transactionsListSchema: Schema<TransactionsList>;
