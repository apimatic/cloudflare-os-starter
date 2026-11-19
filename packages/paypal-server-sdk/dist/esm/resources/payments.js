import { ApiError } from "../core/api-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { captureRequestInternalSchema } from "../models/capture-request.js";
import { capturedPaymentInternalSchema } from "../models/captured-payment.js";
import { errorInternalSchema } from "../models/error.js";
import { paymentAuthorizationInternalSchema, } from "../models/payment-authorization.js";
import { reauthorizeRequestInternalSchema } from "../models/reauthorize-request.js";
import { refundRequestInternalSchema } from "../models/refund-request.js";
import { refundInternalSchema } from "../models/refund.js";
/**
 * Use the `/payments` resource to authorize, capture, void authorizations, and retrieve captures.
 */
export class Payments {
    #rawClient;
    #servers;
    #auth;
    constructor(rawClient, servers, auth) {
        this.#rawClient = rawClient;
        this.#servers = servers;
        this.#auth = auth;
    }
    /**
     * Capture authorized payment
     *
     * @remarks
     * Captures an authorized payment, by ID.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows captured payment details.
     *
     * @throws {@link Payments.CaptureAuthorizedPaymentError} when the API answers with an error
     * status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    captureAuthorizedPayment(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}/capture"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => captureRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: capturedPaymentInternalSchema },
            errorFactory: Payments.CaptureAuthorizedPaymentError,
        }, options);
    }
    /**
     * Show details for authorized payment
     *
     * @remarks
     * Shows details for an authorized payment, by ID.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows authorization details.
     *
     * @throws {@link Payments.GetAuthorizedPaymentError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getAuthorizedPayment(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
            ],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: paymentAuthorizationInternalSchema },
            errorFactory: Payments.GetAuthorizedPaymentError,
        }, options);
    }
    /**
     * Show captured payment details
     *
     * @remarks
     * Shows details for a captured payment, by ID.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows captured payment details.
     *
     * @throws {@link Payments.GetCapturedPaymentError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getCapturedPayment(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v2/payments/captures/{capture_id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "capture_id", value: request.captureId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
            ],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: capturedPaymentInternalSchema },
            errorFactory: Payments.GetCapturedPaymentError,
        }, options);
    }
    /**
     * Show refund details
     *
     * @remarks
     * Shows details for a refund, by ID.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows refund details.
     *
     * @throws {@link Payments.GetRefundError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getRefund(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v2/payments/refunds/{refund_id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "refund_id", value: request.refundId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
            ],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: refundInternalSchema },
            errorFactory: Payments.GetRefundError,
        }, options);
    }
    /**
     * Reauthorize authorized payment
     *
     * @remarks
     * Reauthorizes an authorized PayPal account payment, by ID. To ensure that funds are still
     * available, reauthorize a payment after its initial three-day honor period expires. Within the
     * 29-day authorization period, you can issue multiple re-authorizations after the honor period
     * expires. If 30 days have transpired since the date of the original authorization, you must
     * create an authorized payment instead of reauthorizing the original authorized payment. A
     * reauthorized payment itself has a new honor period of three days. You can reauthorize an
     * authorized payment from 4 to 29 days after the 3-day honor period. The allowed amount depends
     * on context and geography, for example in US it is up to 115% of the original authorized amount,
     * not to exceed an increase of $75 USD. Supports only the `amount` request parameter.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows the reauthorized payment details.
     *
     * @throws {@link Payments.ReauthorizePaymentError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    reauthorizePayment(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}/reauthorize"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => reauthorizeRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: paymentAuthorizationInternalSchema },
            errorFactory: Payments.ReauthorizePaymentError,
        }, options);
    }
    /**
     * Refund captured payment
     *
     * @remarks
     * Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON
     * request body. For a partial refund, include an amount object in the JSON request body.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows refund details.
     *
     * @throws {@link Payments.RefundCapturedPaymentError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    refundCapturedPayment(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/payments/captures/{capture_id}/refund"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "capture_id", value: request.captureId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => refundRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: refundInternalSchema },
            errorFactory: Payments.RefundCapturedPaymentError,
        }, options);
    }
    /**
     * Void authorized payment
     *
     * @remarks
     * Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has
     * been fully captured.
     *
     * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
     * shows authorization details. This response is returned when the Prefer header is set to
     * return=representation.
     *
     * @throws {@link Payments.VoidPaymentError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    voidPayment(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}/void"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: paymentAuthorizationInternalSchema },
            errorFactory: Payments.VoidPaymentError,
        }, options);
    }
}
(function (Payments) {
    class CaptureAuthorizedPaymentError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 409, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error6", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.CaptureAuthorizedPaymentError = CaptureAuthorizedPaymentError;
    class GetAuthorizedPaymentError extends ApiError {
        static errors = [
            { on: 401, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.GetAuthorizedPaymentError = GetAuthorizedPaymentError;
    class GetCapturedPaymentError extends ApiError {
        static errors = [
            { on: 401, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.GetCapturedPaymentError = GetCapturedPaymentError;
    class GetRefundError extends ApiError {
        static errors = [
            { on: 401, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.GetRefundError = GetRefundError;
    class ReauthorizePaymentError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.ReauthorizePaymentError = ReauthorizePaymentError;
    class RefundCapturedPaymentError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 409, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error6", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.RefundCapturedPaymentError = RefundCapturedPaymentError;
    class VoidPaymentError extends ApiError {
        static errors = [
            { on: 401, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 409, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error500", decode: { kind: "empty" } },
        ];
    }
    Payments.VoidPaymentError = VoidPaymentError;
})(Payments || (Payments = {}));
