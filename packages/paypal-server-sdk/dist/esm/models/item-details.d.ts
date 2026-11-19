import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CheckoutOption } from "./checkout-option.js";
import { type MoneyTransactionSearch } from "./money-transaction-search.js";
import { type TaxAmount } from "./tax-amount.js";
/** The item details. */
export type ItemDetails = {
    /** An item code that identifies a merchant's goods or service. */
    itemCode?: string;
    /** The item name. */
    itemName?: string;
    /** The item description. */
    itemDescription?: string;
    /** The item options. Describes option choices on the purchase of the item in some detail. */
    itemOptions?: string;
    /** The number of purchased units of goods or a service. */
    itemQuantity?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    itemUnitPrice?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    itemAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    discountAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    adjustmentAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    giftWrapAmount?: MoneyTransactionSearch;
    /**
     * The percentage, as a fixed-point, signed decimal number. For example, define a 19.99% interest
     * rate as `19.99`.
     */
    taxPercentage?: string;
    /** An array of tax amounts levied by a government on the purchase of goods or services. */
    taxAmounts?: TaxAmount[];
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    basicShippingAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    extraShippingAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    handlingAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    insuranceAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    totalItemAmount?: MoneyTransactionSearch;
    /** The invoice number. An alphanumeric string that identifies a billing for a merchant. */
    invoiceNumber?: string;
    /** An array of checkout options. Each option has a name and value. */
    checkoutOptions?: CheckoutOption[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const itemDetailsInternalSchema: Schema<ItemDetails>;
export declare const itemDetailsSchema: Schema<ItemDetails>;
