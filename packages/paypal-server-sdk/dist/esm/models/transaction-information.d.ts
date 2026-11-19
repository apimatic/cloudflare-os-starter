import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type MoneyTransactionSearch } from "./money-transaction-search.js";
import { type PayPalReferenceIdType } from "./pay-pal-reference-id-type.js";
/** The transaction information. */
export type TransactionInformation = {
    /** The ID of the PayPal account of the counterparty. */
    paypalAccountId?: string;
    /** The PayPal-generated transaction ID. */
    transactionId?: string;
    /**
     * The PayPal-generated base ID. PayPal exclusive. Cannot be altered. Defined as a related,
     * pre-existing transaction or event.
     */
    paypalReferenceId?: string;
    /** The PayPal reference ID type. */
    paypalReferenceIdType?: PayPalReferenceIdType;
    /**
     * A five-digit transaction event code that classifies the transaction type based on money
     * movement and debit or credit. For example, T0001. See [Transaction event
     * codes](/docs/integration/direct/transaction-search/transaction-event-codes/).
     */
    transactionEventCode?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    transactionInitiationDate?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    transactionUpdatedDate?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    transactionAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    feeAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    discountAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    insuranceAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    salesTaxAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingDiscountAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingTaxAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    otherAmount?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    tipAmount?: MoneyTransactionSearch;
    /**
     * A code that indicates the transaction status. Value is: Status code Description D PayPal or
     * merchant rules denied the transaction. P The transaction is pending. The transaction was
     * created but waits for another payment process to complete, such as an ACH transaction, before
     * the status changes to S. S The transaction successfully completed without a denial and after
     * any pending statuses. V A successful transaction was fully reversed and funds were refunded to
     * the original sender.
     */
    transactionStatus?: string;
    /**
     * The subject of payment. The payer passes this value to the payee. The payer controls this data
     * through the interface through which he or she sends the data.
     */
    transactionSubject?: string;
    /**
     * A special note that the payer passes to the payee. Might contain special customer requests,
     * such as shipping instructions.
     */
    transactionNote?: string;
    /**
     * The payment tracking ID, which is a unique ID that partners specify to either get information
     * about a payment or request a refund.
     */
    paymentTrackingId?: string;
    /** The bank reference ID. The bank provides this value for an ACH transaction. */
    bankReferenceId?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    endingBalance?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    availableBalance?: MoneyTransactionSearch;
    /**
     * The invoice ID that is sent by the merchant with the transaction. Note: If an invoice ID was
     * sent with the capture request, the value is reported. Otherwise, the invoice ID of the
     * authorizing transaction is reported.
     */
    invoiceId?: string;
    /**
     * The merchant-provided custom text. Note: Usually, this field includes the unique ID for
     * payments made with MassPay type transaction.
     */
    customField?: string;
    /**
     * Indicates whether the transaction is eligible for protection. Value is: 01. Eligible. 02. Not
     * eligible 03. Partially eligible.
     */
    protectionEligibility?: string;
    /**
     * The credit term. The time span covered by the installment payments as expressed in the term
     * length plus the length time unit code.
     */
    creditTerm?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    creditTransactionalFee?: MoneyTransactionSearch;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    creditPromotionalFee?: MoneyTransactionSearch;
    /**
     * The percentage, as a fixed-point, signed decimal number. For example, define a 19.99% interest
     * rate as `19.99`.
     */
    annualPercentageRate?: string;
    /**
     * The payment method that was used for a transaction. Value is PUI, installment, or mEFT. Note:
     * Appears only for pay upon invoice (PUI), installment, and mEFT transactions. Merchants and
     * partners in the EMEA region can use this attribute to note transactions that attract turn-over
     * tax.
     */
    paymentMethodType?: string;
    /**
     * A high-level classification of the type of financial instrument that was used to fund a
     * payment. The pattern is not provided because the value is defined by an external party. E.g.
     * PAYPAL, CREDIT_CARD, DEBIT_CARD, APPLE_PAY, BANK , VENMO ,Pay Upon Invoice, Pay Later or
     * Alternative Payment Methods (APM).
     */
    instrumentType?: string;
    /**
     * A finer-grained classification of the financial instrument that was used to fund a payment. For
     * example, `Visa card` or a `Mastercard` for a credit card, BANKCARD ,DISCOVER etc. The pattern
     * is not provided because the value is defined by an external party.
     */
    instrumentSubType?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const transactionInformationInternalSchema: Schema<TransactionInformation>;
export declare const transactionInformationSchema: Schema<TransactionInformation>;
