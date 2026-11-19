import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import type { Schema } from "../core/validation/schema.js";
import { type BalancesResponse } from "../models/balances-response.js";
import { type DefaultError } from "../models/default-error.js";
import { type SearchResponse } from "../models/search-response.js";
import type { Servers } from "../servers.js";
/**
 * Use the `/transactions` resource to list transactions and the `/balances` resource to list
 * balances.
 */
export declare class TransactionSearch {
    #private;
    constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes);
    /**
     * List all balances
     *
     * @remarks
     * List all balances. Specify date time to list balances for that time that appear in the
     * response. Notes: It takes a maximum of three hours for balances to appear in the list balances
     * call. This call lists balances upto the previous three years.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that lists balances .
     *
     * @throws {@link TransactionSearch.SearchBalancesError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    searchBalances(request?: TransactionSearch.SearchBalancesRequest, options?: RequestOptions): ApiPromise<BalancesResponse, TransactionSearch.SearchBalancesError>;
    /**
     * List transactions
     *
     * @remarks
     * Lists transactions. Specify one or more query parameters to filter the transaction that appear
     * in the response. Notes: If you specify one or more optional query parameters, the
     * ending_balance response field is empty. It takes a maximum of three hours for executed
     * transactions to appear in the list transactions call. This call lists transaction for the
     * previous three years.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that lists transactions .
     *
     * @throws {@link ApiError} when the API answers with an error status
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    searchTransactions(request: TransactionSearch.SearchTransactionsRequest, options?: RequestOptions): ApiPromise<SearchResponse, ApiError>;
}
export declare namespace TransactionSearch {
    type SearchBalancesRequest = {
        /**
         * List balances in the response at the date time provided, will return the last refreshed
         * balance in the system when not provided.
         */
        asOfTime?: string;
        /**
         * Filters the transactions in the response by a [three-character ISO-4217 currency
         * code](/api/rest/reference/currency-codes/) for the PayPal transaction currency.
         */
        currencyCode?: string;
    };
    const searchBalancesRequestSchema: Schema<SearchBalancesRequest>;
    class SearchBalancesError extends ApiError {
        readonly payload: Declared<"defaultError", DefaultError> | Declared<"defaultError2", DefaultError> | Declared<"defaultError3", DefaultError> | Undeclared;
        static readonly errors: ErrorDecoders<SearchBalancesError>;
    }
    type SearchTransactionsRequest = {
        /**
         * Filters the transactions in the response by a start date and time, in [Internet date and time
         * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required. Fractional
         * seconds are optional.
         */
        startDate: string;
        /**
         * Filters the transactions in the response by an end date and time, in [Internet date and time
         * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required. Fractional
         * seconds are optional. The maximum supported range is 31 days.
         */
        endDate: string;
        /**
         * Filters the transactions in the response by a PayPal transaction ID. A valid transaction ID
         * is 17 characters long, except for an order ID, which is 19 characters long. Note: A
         * transaction ID is not unique in the reporting system. The response can list two transactions
         * with the same ID. One transaction can be balance affecting while the other is non-balance
         * affecting.
         */
        transactionId?: string;
        /**
         * Filters the transactions in the response by a PayPal transaction event code. See [Transaction
         * event codes](/docs/integration/direct/transaction-search/transaction-event-codes/).
         */
        transactionType?: string;
        /**
         * Filters the transactions in the response by a PayPal transaction status code. Value is:
         * Status code Description D PayPal or merchant rules denied the transaction. P The transaction
         * is pending. The transaction was created but waits for another payment process to complete,
         * such as an ACH transaction, before the status changes to S. S The transaction successfully
         * completed without a denial and after any pending statuses. V A successful transaction was
         * reversed and funds were refunded to the original sender.
         */
        transactionStatus?: string;
        /**
         * Filters the transactions in the response by a gross transaction amount range. Specify the
         * range as ` TO `, where ` ` is the lower limit of the gross PayPal transaction amount and ` `
         * is the upper limit of the gross transaction amount. Specify the amounts in lower
         * denominations. For example, to search for transactions from $5.00 to $10.05, specify `[500 TO
         * 1005]`. Note:The values must be URL encoded.
         */
        transactionAmount?: string;
        /**
         * Filters the transactions in the response by a [three-character ISO-4217 currency
         * code](/api/rest/reference/currency-codes/) for the PayPal transaction currency.
         */
        transactionCurrency?: string;
        /**
         * Filters the transactions in the response by a payment instrument type. Value is either:
         * CREDITCARD. Returns a direct credit card transaction with a corresponding value. DEBITCARD.
         * Returns a debit card transaction with a corresponding value. If you omit this parameter, the
         * API does not apply this filter.
         */
        paymentInstrumentType?: string;
        /** Filters the transactions in the response by a store ID. */
        storeId?: string;
        /** Filters the transactions in the response by a terminal ID. */
        terminalId?: string;
        /**
         * Indicates which fields appear in the response. Value is a single field or a comma-separated
         * list of fields. The transaction_info value returns only the transaction details in the
         * response. To include all fields in the response, specify fields=all. Valid fields are:
         * transaction_info. The transaction information. Includes the ID of the PayPal account of the
         * payee, the PayPal-generated transaction ID, the PayPal-generated base ID, the PayPal
         * reference ID type, the transaction event code, the date and time when the transaction was
         * initiated and was last updated, the transaction amounts including the PayPal fee, any
         * discounts, insurance, the transaction status, and other information about the transaction.
         * payer_info. The payer information. Includes the PayPal customer account ID and the payer's
         * email address, primary phone number, name, country code, address, and whether the payer is
         * verified or unverified. shipping_info. The shipping information. Includes the recipient's
         * name, the shipping method for this order, the shipping address for this order, and the
         * secondary address associated with this order. auction_info. The auction information. Includes
         * the name of the auction site, the auction site URL, the ID of the customer who makes the
         * purchase in the auction, and the date and time when the auction closes. cart_info. The cart
         * information. Includes an array of item details, whether the item amount or the shipping
         * amount already includes tax, and the ID of the invoice for PayPal-generated invoices.
         * incentive_info. An array of incentive detail objects. Each object includes the incentive,
         * such as a special offer or coupon, the incentive amount, and the incentive program code that
         * identifies a merchant loyalty or incentive program. store_info. The store information.
         * Includes the ID of the merchant store and the terminal ID for the checkout stand in the
         * merchant store.
         *
         * @default "transaction_info"
         */
        fields?: string;
        /**
         * Indicates whether the response includes only balance-impacting transactions or all
         * transactions. Value is either: Y. The default. The response includes only balance
         * transactions. N. The response includes all transactions.
         *
         * @default "Y"
         */
        balanceAffectingRecordsOnly?: string;
        /**
         * The number of items to return in the response. So, the combination of `page=1` and
         * `page_size=20` returns the first 20 items. The combination of `page=2` and `page_size=20`
         * returns the next 20 items.
         *
         * @default 100
         */
        pageSize?: number;
        /**
         * The zero-relative start index of the entire list of items that are returned in the response.
         * So, the combination of `page=1` and `page_size=20` returns the first 20 items.
         *
         * @default 1
         */
        page?: number;
    };
    const searchTransactionsRequestSchema: Schema<SearchTransactionsRequest>;
}
