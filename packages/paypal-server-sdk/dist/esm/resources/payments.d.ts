import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { type CaptureRequest } from "../models/capture-request.js";
import { type CapturedPayment } from "../models/captured-payment.js";
import { type Error } from "../models/error.js";
import { type PaymentAuthorization } from "../models/payment-authorization.js";
import { type ReauthorizeRequest } from "../models/reauthorize-request.js";
import { type RefundRequest } from "../models/refund-request.js";
import { type Refund } from "../models/refund.js";
import type { Servers } from "../servers.js";
/**
 * Use the `/payments` resource to authorize, capture, void authorizations, and retrieve captures.
 */
export declare class Payments {
    #private;
    constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes);
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
    captureAuthorizedPayment(request: Payments.CaptureAuthorizedPaymentRequest, options?: RequestOptions): ApiPromise<CapturedPayment, Payments.CaptureAuthorizedPaymentError>;
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
    getAuthorizedPayment(request: Payments.GetAuthorizedPaymentRequest, options?: RequestOptions): ApiPromise<PaymentAuthorization, Payments.GetAuthorizedPaymentError>;
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
    getCapturedPayment(request: Payments.GetCapturedPaymentRequest, options?: RequestOptions): ApiPromise<CapturedPayment, Payments.GetCapturedPaymentError>;
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
    getRefund(request: Payments.GetRefundRequest, options?: RequestOptions): ApiPromise<Refund, Payments.GetRefundError>;
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
    reauthorizePayment(request: Payments.ReauthorizePaymentRequest, options?: RequestOptions): ApiPromise<PaymentAuthorization, Payments.ReauthorizePaymentError>;
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
    refundCapturedPayment(request: Payments.RefundCapturedPaymentRequest, options?: RequestOptions): ApiPromise<Refund, Payments.RefundCapturedPaymentError>;
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
    voidPayment(request: Payments.VoidPaymentRequest, options?: RequestOptions): ApiPromise<PaymentAuthorization, Payments.VoidPaymentError>;
}
export declare namespace Payments {
    type CaptureAuthorizedPaymentRequest = {
        /** The PayPal-generated ID for the authorized payment to capture. */
        authorizationId: string;
        /**
         * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
         * header configures the sandbox into a negative testing state for transactions that include the
         * merchant.
         */
        payPalMockResponse?: string;
        /** The server stores keys for 45 days. */
        payPalRequestId?: string;
        /**
         * The preferred server response upon successful completion of the request. Value is:
         * return=minimal. The server returns a minimal response to optimize communication between the
         * API caller and the server. A minimal response includes the id, status and HATEOAS links.
         * return=representation. The server returns a complete resource representation, including the
         * current state of the resource.
         *
         * @default "return=minimal"
         */
        prefer?: string;
        /**
         * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
         * details, see
         * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
         * three party transactions in which a partner is managing the API calls on behalf of a
         * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
         * or an access token with target_subject.
         */
        payPalAuthAssertion?: string;
        body?: CaptureRequest;
    };
    class CaptureAuthorizedPaymentError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Declared<"error5", Error> | Declared<"error6", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<CaptureAuthorizedPaymentError>;
    }
    type GetAuthorizedPaymentRequest = {
        /** The ID of the authorized payment for which to show details. */
        authorizationId: string;
        /**
         * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
         * header configures the sandbox into a negative testing state for transactions that include the
         * merchant.
         */
        payPalMockResponse?: string;
        /**
         * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
         * details, see
         * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
         * three party transactions in which a partner is managing the API calls on behalf of a
         * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
         * or an access token with target_subject.
         */
        payPalAuthAssertion?: string;
    };
    class GetAuthorizedPaymentError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<GetAuthorizedPaymentError>;
    }
    type GetCapturedPaymentRequest = {
        /** The PayPal-generated ID for the captured payment for which to show details. */
        captureId: string;
        /**
         * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
         * header configures the sandbox into a negative testing state for transactions that include the
         * merchant.
         */
        payPalMockResponse?: string;
    };
    class GetCapturedPaymentError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<GetCapturedPaymentError>;
    }
    type GetRefundRequest = {
        /** The PayPal-generated ID for the refund for which to show details. */
        refundId: string;
        /**
         * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
         * header configures the sandbox into a negative testing state for transactions that include the
         * merchant.
         */
        payPalMockResponse?: string;
        /**
         * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
         * details, see
         * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
         * three party transactions in which a partner is managing the API calls on behalf of a
         * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
         * or an access token with target_subject.
         */
        payPalAuthAssertion?: string;
    };
    class GetRefundError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<GetRefundError>;
    }
    type ReauthorizePaymentRequest = {
        /** The PayPal-generated ID for the authorized payment to reauthorize. */
        authorizationId: string;
        /** The server stores keys for 45 days. */
        payPalRequestId?: string;
        /**
         * The preferred server response upon successful completion of the request. Value is:
         * return=minimal. The server returns a minimal response to optimize communication between the
         * API caller and the server. A minimal response includes the id, status and HATEOAS links.
         * return=representation. The server returns a complete resource representation, including the
         * current state of the resource.
         *
         * @default "return=minimal"
         */
        prefer?: string;
        /**
         * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
         * details, see
         * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
         * three party transactions in which a partner is managing the API calls on behalf of a
         * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
         * or an access token with target_subject.
         */
        payPalAuthAssertion?: string;
        body?: ReauthorizeRequest;
    };
    class ReauthorizePaymentError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Declared<"error5", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<ReauthorizePaymentError>;
    }
    type RefundCapturedPaymentRequest = {
        /** The PayPal-generated ID for the captured payment to refund. */
        captureId: string;
        /**
         * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
         * header configures the sandbox into a negative testing state for transactions that include the
         * merchant.
         */
        payPalMockResponse?: string;
        /** The server stores keys for 45 days. */
        payPalRequestId?: string;
        /**
         * The preferred server response upon successful completion of the request. Value is:
         * return=minimal. The server returns a minimal response to optimize communication between the
         * API caller and the server. A minimal response includes the id, status and HATEOAS links.
         * return=representation. The server returns a complete resource representation, including the
         * current state of the resource.
         *
         * @default "return=minimal"
         */
        prefer?: string;
        /**
         * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
         * details, see
         * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
         * three party transactions in which a partner is managing the API calls on behalf of a
         * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
         * or an access token with target_subject.
         */
        payPalAuthAssertion?: string;
        body?: RefundRequest;
    };
    class RefundCapturedPaymentError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Declared<"error5", Error> | Declared<"error6", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<RefundCapturedPaymentError>;
    }
    type VoidPaymentRequest = {
        /** The PayPal-generated ID for the authorized payment to void. */
        authorizationId: string;
        /**
         * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
         * header configures the sandbox into a negative testing state for transactions that include the
         * merchant.
         */
        payPalMockResponse?: string;
        /**
         * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
         * details, see
         * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
         * three party transactions in which a partner is managing the API calls on behalf of a
         * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
         * or an access token with target_subject.
         */
        payPalAuthAssertion?: string;
        /** The server stores keys for 45 days. */
        payPalRequestId?: string;
        /**
         * The preferred server response upon successful completion of the request. Value is:
         * return=minimal. The server returns a minimal response to optimize communication between the
         * API caller and the server. A minimal response includes the id, status and HATEOAS links.
         * return=representation. The server returns a complete resource representation, including the
         * current state of the resource.
         *
         * @default "return=minimal"
         */
        prefer?: string;
    };
    class VoidPaymentError extends ApiError {
        readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error> | Declared<"error4", Error> | Declared<"error5", Error> | Declared<"error500", undefined> | Undeclared;
        static readonly errors: ErrorDecoders<VoidPaymentError>;
    }
}
