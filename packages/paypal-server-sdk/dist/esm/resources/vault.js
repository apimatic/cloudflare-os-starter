import { ApiError } from "../core/api-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { customerVaultPaymentTokensResponseInternalSchema, } from "../models/customer-vault-payment-tokens-response.js";
import { errorInternalSchema } from "../models/error.js";
import { paymentTokenRequestInternalSchema, paymentTokenRequestSchema, } from "../models/payment-token-request.js";
import { paymentTokenResponseInternalSchema, } from "../models/payment-token-response.js";
import { setupTokenRequestInternalSchema, setupTokenRequestSchema, } from "../models/setup-token-request.js";
import { setupTokenResponseInternalSchema } from "../models/setup-token-response.js";
/**
 * Use the `/vault` resource to create, retrieve, and delete payment and setup tokens.
 */
export class Vault {
    #rawClient;
    #servers;
    #auth;
    constructor(rawClient, servers, auth) {
        this.#rawClient = rawClient;
        this.#servers = servers;
        this.#auth = auth;
    }
    /**
     * Create payment token for a given payment source
     *
     * @remarks
     * Creates a Payment Token from the given payment source and adds it to the Vault of the
     * associated customer.
     *
     * @returns Idempotent response for a successful creation of payment token.
     *
     * @throws {@link Vault.CreatePaymentTokenError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    createPaymentToken(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v3/vault/payment-tokens"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [],
            headers: [
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "json", value: request.body, schema: paymentTokenRequestInternalSchema },
        }, {
            success: { kind: "json", schema: paymentTokenResponseInternalSchema },
            errorFactory: Vault.CreatePaymentTokenError,
        }, options);
    }
    /**
     * Create a setup token
     *
     * @remarks
     * Creates a Setup Token from the given payment source and adds it to the Vault of the associated
     * customer.
     *
     * @returns Idempotent response for a successful creation of setup token.
     *
     * @throws {@link Vault.CreateSetupTokenError} when the API answers with an error status — narrow
     * on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    createSetupToken(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v3/vault/setup-tokens"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [],
            headers: [
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "json", value: request.body, schema: setupTokenRequestInternalSchema },
        }, {
            success: { kind: "json", schema: setupTokenResponseInternalSchema },
            errorFactory: Vault.CreateSetupTokenError,
        }, options);
    }
    /**
     * Delete payment token
     *
     * @remarks
     * Delete the payment token associated with the payment token id.
     *
     * @returns The server has successfully executed the method, but there is no entity body to
     * return.
     *
     * @throws {@link Vault.DeletePaymentTokenError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    deletePaymentToken(request, options) {
        return this.#rawClient.execute({
            method: "DELETE",
            urlTemplate: this.#servers.default("/v3/vault/payment-tokens/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: { kind: "empty" },
        }, {
            success: { kind: "empty" },
            errorFactory: Vault.DeletePaymentTokenError,
        }, options);
    }
    /**
     * Retrieve a payment token
     *
     * @remarks
     * Returns a readable representation of vaulted payment source associated with the payment token
     * id.
     *
     * @returns Successful execution.
     *
     * @throws {@link Vault.GetPaymentTokenError} when the API answers with an error status — narrow
     * on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getPaymentToken(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v3/vault/payment-tokens/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: paymentTokenResponseInternalSchema },
            errorFactory: Vault.GetPaymentTokenError,
        }, options);
    }
    /**
     * Retrieve a setup token
     *
     * @remarks
     * Returns a readable representation of temporarily vaulted payment source associated with the
     * setup token id.
     *
     * @returns Found requested setup-token, returned a payment method associated with the token.
     *
     * @throws {@link Vault.GetSetupTokenError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getSetupToken(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v3/vault/setup-tokens/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: setupTokenResponseInternalSchema },
            errorFactory: Vault.GetSetupTokenError,
        }, options);
    }
    /**
     * List all payment tokens
     *
     * @remarks
     * Returns all payment tokens for a customer.
     *
     * @returns Successful execution.
     *
     * @throws {@link Vault.ListCustomerPaymentTokensError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    listCustomerPaymentTokens(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v3/vault/payment-tokens"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [
                { name: "customer_id", value: request.customerId, schema: s.string() },
                { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 5) },
                { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
                { name: "total_required", value: request.totalRequired, schema: s.defaulted(s.boolean(), false) },
            ],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: customerVaultPaymentTokensResponseInternalSchema },
            errorFactory: Vault.ListCustomerPaymentTokensError,
        }, options);
    }
}
(function (Vault) {
    Vault.createPaymentTokenRequestSchema = s.lazySchema(() => s.object({
        payPalRequestId: s.optional(s.string().check(s.minLength(1), s.maxLength(108), s.pattern("^.*$"))),
        body: paymentTokenRequestSchema,
    }));
    class CreatePaymentTokenError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Vault.CreatePaymentTokenError = CreatePaymentTokenError;
    Vault.createSetupTokenRequestSchema = s.lazySchema(() => s.object({
        payPalRequestId: s.optional(s.string().check(s.minLength(1), s.maxLength(108), s.pattern("^.*$"))),
        body: setupTokenRequestSchema,
    }));
    class CreateSetupTokenError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Vault.CreateSetupTokenError = CreateSetupTokenError;
    Vault.deletePaymentTokenRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[0-9a-zA-Z_-]+$")),
    }));
    class DeletePaymentTokenError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Vault.DeletePaymentTokenError = DeletePaymentTokenError;
    Vault.getPaymentTokenRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[0-9a-zA-Z_-]+$")),
    }));
    class GetPaymentTokenError extends ApiError {
        static errors = [
            { on: 403, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Vault.GetPaymentTokenError = GetPaymentTokenError;
    Vault.getSetupTokenRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(7), s.maxLength(36), s.pattern("^[0-9a-zA-Z_-]+$")),
    }));
    class GetSetupTokenError extends ApiError {
        static errors = [
            { on: 403, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Vault.GetSetupTokenError = GetSetupTokenError;
    Vault.listCustomerPaymentTokensRequestSchema = s.lazySchema(() => s.object({
        customerId: s.string().check(s.minLength(7), s.maxLength(36), s.pattern("^[0-9a-zA-Z_-]+$")),
        pageSize: s.defaulted(s.int().check(s.gte(1), s.lte(5)), 5),
        page: s.defaulted(s.int().check(s.gte(1), s.lte(10)), 1),
        totalRequired: s.defaulted(s.boolean(), false),
    }));
    class ListCustomerPaymentTokensError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Vault.ListCustomerPaymentTokensError = ListCustomerPaymentTokensError;
})(Vault || (Vault = {}));
