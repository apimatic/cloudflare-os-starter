import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ExchangeRate } from "./exchange-rate.js";
import { type Money } from "./money.js";
/**
 * The net amount. Returned when the currency of the refund is different from the currency of the
 * PayPal account where the merchant holds their funds.
 */
export type NetAmountBreakdownItem = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    payableAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    convertedAmount?: Money;
    /**
     * The exchange rate that determines the amount to convert from one currency to another currency.
     */
    exchangeRate?: ExchangeRate;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const netAmountBreakdownItemInternalSchema: Schema<NetAmountBreakdownItem>;
export declare const netAmountBreakdownItemSchema: Schema<NetAmountBreakdownItem>;
