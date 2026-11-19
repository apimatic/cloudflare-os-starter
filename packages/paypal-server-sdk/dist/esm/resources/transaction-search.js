import { ApiError } from "../core/api-error.js";
import * as s from "../core/validation/index.js";
import { balancesResponseInternalSchema } from "../models/balances-response.js";
import { defaultErrorSchema } from "../models/default-error.js";
import { searchResponseInternalSchema } from "../models/search-response.js";
/**
 * Use the `/transactions` resource to list transactions and the `/balances` resource to list
 * balances.
 */
export class TransactionSearch {
    #rawClient;
    #servers;
    #auth;
    constructor(rawClient, servers, auth) {
        this.#rawClient = rawClient;
        this.#servers = servers;
        this.#auth = auth;
    }
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
    searchBalances(request = {}, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/reporting/balances"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [
                { name: "as_of_time", value: request.asOfTime, schema: s.optional(s.string()) },
                { name: "currency_code", value: request.currencyCode, schema: s.optional(s.string()) },
            ],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: balancesResponseInternalSchema },
            errorFactory: TransactionSearch.SearchBalancesError,
        }, options);
    }
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
    searchTransactions(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/reporting/transactions"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [
                { name: "start_date", value: request.startDate, schema: s.string() },
                { name: "end_date", value: request.endDate, schema: s.string() },
                { name: "transaction_id", value: request.transactionId, schema: s.optional(s.string()) },
                { name: "transaction_type", value: request.transactionType, schema: s.optional(s.string()) },
                { name: "transaction_status", value: request.transactionStatus, schema: s.optional(s.string()) },
                { name: "transaction_amount", value: request.transactionAmount, schema: s.optional(s.string()) },
                {
                    name: "transaction_currency",
                    value: request.transactionCurrency,
                    schema: s.optional(s.string()),
                },
                {
                    name: "payment_instrument_type",
                    value: request.paymentInstrumentType,
                    schema: s.optional(s.string()),
                },
                { name: "store_id", value: request.storeId, schema: s.optional(s.string()) },
                { name: "terminal_id", value: request.terminalId, schema: s.optional(s.string()) },
                { name: "fields", value: request.fields, schema: s.defaulted(s.string(), "transaction_info") },
                {
                    name: "balance_affecting_records_only",
                    value: request.balanceAffectingRecordsOnly,
                    schema: s.defaulted(s.string(), "Y"),
                },
                { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 100) },
                { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
            ],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: searchResponseInternalSchema },
            errorFactory: ApiError,
        }, options);
    }
}
(function (TransactionSearch) {
    TransactionSearch.searchBalancesRequestSchema = s.lazySchema(() => s.object({
        asOfTime: s.optional(s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
        currencyCode: s.optional(s.string().check(s.minLength(3), s.maxLength(3))),
    }));
    class SearchBalancesError extends ApiError {
        static errors = [
            { on: 400, kind: "defaultError", decode: { kind: "json", schema: defaultErrorSchema } },
            { on: 403, kind: "defaultError2", decode: { kind: "json", schema: defaultErrorSchema } },
            { on: 500, kind: "defaultError3", decode: { kind: "json", schema: defaultErrorSchema } },
        ];
    }
    TransactionSearch.SearchBalancesError = SearchBalancesError;
    TransactionSearch.searchTransactionsRequestSchema = s.lazySchema(() => s.object({
        startDate: s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$")),
        endDate: s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$")),
        transactionId: s.optional(s.string().check(s.minLength(17), s.maxLength(19))),
        transactionType: s.optional(s.string()),
        transactionStatus: s.optional(s.string()),
        transactionAmount: s.optional(s.string()),
        transactionCurrency: s.optional(s.string()),
        paymentInstrumentType: s.optional(s.string()),
        storeId: s.optional(s.string()),
        terminalId: s.optional(s.string()),
        fields: s.defaulted(s.string(), "transaction_info"),
        balanceAffectingRecordsOnly: s.defaulted(s.string(), "Y"),
        pageSize: s.defaulted(s.int().check(s.gte(1), s.lte(500)), 100),
        page: s.defaulted(s.int().check(s.gte(1), s.lte(2147483647)), 1),
    }));
})(TransactionSearch || (TransactionSearch = {}));
