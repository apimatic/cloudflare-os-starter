import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type MoneyTransactionSearch } from "./money-transaction-search.js";
/** The incentive details. */
export type IncentiveDetails = {
    /** The type of incentive, such as a special offer or coupon. */
    incentiveType?: string;
    /** The code that identifies an incentive, such as a coupon. */
    incentiveCode?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    incentiveAmount?: MoneyTransactionSearch;
    /** The incentive program code that identifies a merchant loyalty or incentive program. */
    incentiveProgramCode?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const incentiveDetailsInternalSchema: Schema<IncentiveDetails>;
export declare const incentiveDetailsSchema: Schema<IncentiveDetails>;
