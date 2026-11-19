import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import type { Schema } from "../core/validation/schema.js";
import { type CustomerVaultPaymentTokensResponse } from "../models/customer-vault-payment-tokens-response.js";
import { type Error } from "../models/error.js";
import { type PaymentTokenRequest } from "../models/payment-token-request.js";
import { type PaymentTokenResponse } from "../models/payment-token-response.js";
import { type SetupTokenRequest } from "../models/setup-token-request.js";
import { type SetupTokenResponse } from "../models/setup-token-response.js";
import type { Servers } from "../servers.js";
/**
 * Use the `/vault` resource to create, retrieve, and delete payment and setup tokens.
 */
export declare class Vault {
    #private;
    constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes);
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
    createPaymentToken(request: Vault.CreatePaymentTokenRequest, options?: RequestOptions): ApiPromise<PaymentTokenResponse, Vault.CreatePaymentTokenError>;
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
    createSetupToken(request: Vault.CreateSetupTokenRequest, options?: RequestOptions): ApiPromise<SetupTokenResponse, Vault.CreateSetupTokenError>;
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
    deletePaymentToken(request: Vault.DeletePaymentTokenRequest, options?: RequestOptions): ApiPromise<undefined, Vault.DeletePaymentTokenError>;
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
    getPaymentToken(request: Vault.GetPaymentTokenRequest, options?: RequestOptions): ApiPromise<PaymentTokenResponse, Vault.GetPaymentTokenError>;
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
    getSetupToken(request: Vault.GetSetupTokenRequest, options?: RequestOptions): ApiPromise<SetupTokenResponse, Vault.GetSetupTokenError>;
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
    listCustomerPaymentTokens(request: Vault.ListCustomerPaymentTokensRequest, options?: RequestOptions): ApiPromise<CustomerVaultPaymentTokensResponse, Vault.ListCustomerPaymentTokensError>;
}
export declare namespace Vault {
    type CreatePaymentTokenRequest = {
        /** The server stores keys for 3 hours. */
        payPalRequestId?: string;
        /** Payment Token creation with a financial instrument and an optional customer_id. */
        body: PaymentTokenRequest;
    };
    const createPaymentTokenRequestSchema: Schema<CreatePaymentTokenRequest>;
    class CreatePaymentTokenError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Declared<"error5", Error> | Undeclared;
        static readonly errors: ErrorDecoders<CreatePaymentTokenError>;
    }
    type CreateSetupTokenRequest = {
        /** The server stores keys for 3 hours. */
        payPalRequestId?: string;
        /**
         * Setup Token creation with a instrument type optional financial instrument details and
         * customer_id.
         */
        body: SetupTokenRequest;
    };
    const createSetupTokenRequestSchema: Schema<CreateSetupTokenRequest>;
    class CreateSetupTokenError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Undeclared;
        static readonly errors: ErrorDecoders<CreateSetupTokenError>;
    }
    type DeletePaymentTokenRequest = {
        /** ID of the payment token. */
        id: string;
    };
    const deletePaymentTokenRequestSchema: Schema<DeletePaymentTokenRequest>;
    class DeletePaymentTokenError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Undeclared;
        static readonly errors: ErrorDecoders<DeletePaymentTokenError>;
    }
    type GetPaymentTokenRequest = {
        /** ID of the payment token. */
        id: string;
    };
    const getPaymentTokenRequestSchema: Schema<GetPaymentTokenRequest>;
    class GetPaymentTokenError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Undeclared;
        static readonly errors: ErrorDecoders<GetPaymentTokenError>;
    }
    type GetSetupTokenRequest = {
        /** ID of the setup token. */
        id: string;
    };
    const getSetupTokenRequestSchema: Schema<GetSetupTokenRequest>;
    class GetSetupTokenError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Undeclared;
        static readonly errors: ErrorDecoders<GetSetupTokenError>;
    }
    type ListCustomerPaymentTokensRequest = {
        /**
         * A unique identifier representing a specific customer in merchant's/partner's system or
         * records.
         */
        customerId: string;
        /**
         * A non-negative, non-zero integer indicating the maximum number of results to return at one
         * time.
         *
         * @default 5
         */
        pageSize?: number;
        /** A non-negative, non-zero integer representing the page of the results. @default 1 */
        page?: number;
        /**
         * A boolean indicating total number of items (total_items) and pages (total_pages) are expected
         * to be returned in the response.
         *
         * @default false
         */
        totalRequired?: boolean;
    };
    const listCustomerPaymentTokensRequestSchema: Schema<ListCustomerPaymentTokensRequest>;
    class ListCustomerPaymentTokensError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Undeclared;
        static readonly errors: ErrorDecoders<ListCustomerPaymentTokensError>;
    }
}
