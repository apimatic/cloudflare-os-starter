import { ApiError } from "../core/api-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { confirmOrderRequestInternalSchema, confirmOrderRequestSchema, } from "../models/confirm-order-request.js";
import { errorInternalSchema } from "../models/error.js";
import { orderAuthorizeRequestInternalSchema, orderAuthorizeRequestSchema, } from "../models/order-authorize-request.js";
import { orderAuthorizeResponseInternalSchema, } from "../models/order-authorize-response.js";
import { orderCaptureRequestInternalSchema, orderCaptureRequestSchema, } from "../models/order-capture-request.js";
import { orderRequestInternalSchema, orderRequestSchema, } from "../models/order-request.js";
import { orderTrackerRequestInternalSchema, orderTrackerRequestSchema, } from "../models/order-tracker-request.js";
import { orderInternalSchema } from "../models/order.js";
import { patchSchema } from "../models/patch.js";
/**
 * Use the `/orders` resource to create, update, retrieve, authorize, capture and track orders.
 */
export class Orders {
    #rawClient;
    #servers;
    #auth;
    constructor(rawClient, servers, auth) {
        this.#rawClient = rawClient;
        this.#servers = servers;
        this.#auth = auth;
    }
    /**
     * Authorize payment for order
     *
     * @remarks
     * Authorizes payment for an order. To successfully authorize payment for an order, the buyer must
     * first approve the order or a valid payment_source must be provided in the request. A buyer can
     * approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS
     * links in the create order response. Note: For error handling and troubleshooting, see Orders v2
     * errors.
     *
     * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
     * with a JSON response body that shows authorized payment details.
     *
     * @throws {@link Orders.AuthorizeOrderError} when the API answers with an error status — narrow
     * on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    authorizeOrder(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/authorize"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                {
                    name: "PayPal-Client-Metadata-Id",
                    value: request.payPalClientMetadataId,
                    schema: s.optional(s.string()),
                },
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
                schema: s.optional(s.lazy(() => orderAuthorizeRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: orderAuthorizeResponseInternalSchema },
            errorFactory: Orders.AuthorizeOrderError,
        }, options);
    }
    /**
     * Capture payment for order
     *
     * @remarks
     * Captures payment for an order. To successfully capture payment for an order, the buyer must
     * first approve the order or a valid payment_source must be provided in the request. A buyer can
     * approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS
     * links in the create order response. Note: For error handling and troubleshooting, see Orders v2
     * errors.
     *
     * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
     * with a JSON response body that shows captured payment details.
     *
     * @throws {@link Orders.CaptureOrderError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    captureOrder(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/capture"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                {
                    name: "PayPal-Client-Metadata-Id",
                    value: request.payPalClientMetadataId,
                    schema: s.optional(s.string()),
                },
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
                schema: s.optional(s.lazy(() => orderCaptureRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: orderInternalSchema },
            errorFactory: Orders.CaptureOrderError,
        }, options);
    }
    /**
     * Confirm the Order
     *
     * @remarks
     * Payer confirms their intent to pay for the the Order with the given payment source.
     *
     * @returns A successful request indicates that the payment source was added to the Order. A
     * successful request returns the HTTP `200 OK` status code with a JSON response body that shows
     * order details.
     *
     * @throws {@link Orders.ConfirmOrderError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    confirmOrder(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/confirm-payment-source"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [
                {
                    name: "PayPal-Client-Metadata-Id",
                    value: request.payPalClientMetadataId,
                    schema: s.optional(s.string()),
                },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => confirmOrderRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: orderInternalSchema },
            errorFactory: Orders.ConfirmOrderError,
        }, options);
    }
    /**
     * Create order
     *
     * @remarks
     * Creates an order. Merchants and partners can add Level 2 and 3 data to payments to reduce risk
     * and payment processing costs. For more information about processing payments, see checkout or
     * multiparty checkout. Note: For error handling and troubleshooting, see Orders v2 errors.
     *
     * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
     * with a JSON response body that shows order details.
     *
     * @throws {@link Orders.CreateOrderError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    createOrder(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/checkout/orders"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                {
                    name: "PayPal-Partner-Attribution-Id",
                    value: request.payPalPartnerAttributionId,
                    schema: s.optional(s.string()),
                },
                {
                    name: "PayPal-Client-Metadata-Id",
                    value: request.payPalClientMetadataId,
                    schema: s.optional(s.string()),
                },
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "json", value: request.body, schema: orderRequestInternalSchema },
        }, {
            success: { kind: "json", schema: orderInternalSchema },
            errorFactory: Orders.CreateOrderError,
        }, options);
    }
    /**
     * Add tracking information for an Order.
     *
     * @remarks
     * Adds tracking information for an Order.
     *
     * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
     * with a JSON response body that shows tracker details.
     *
     * @throws {@link Orders.CreateOrderTrackingError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    createOrderTracking(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/track"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "json", value: request.body, schema: orderTrackerRequestInternalSchema },
        }, {
            success: { kind: "json", schema: orderInternalSchema },
            errorFactory: Orders.CreateOrderTrackingError,
        }, options);
    }
    /**
     * Show order details
     *
     * @remarks
     * Shows details for an order, by ID. Note: For error handling and troubleshooting, see Orders v2
     * errors.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows order details.
     *
     * @throws {@link Orders.GetOrderError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getOrder(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [{ name: "fields", value: request.fields, schema: s.optional(s.string()) }],
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
            success: { kind: "json", schema: orderInternalSchema },
            errorFactory: Orders.GetOrderError,
        }, options);
    }
    /**
     * Update order
     *
     * @remarks
     * Updates an order with a `CREATED` or `APPROVED` status. You cannot update an order with the
     * `COMPLETED` status.<br/><br/>To make an update, you must provide a `reference_id`. If you omit
     * this value with an order that contains only one purchase unit, PayPal sets the value to
     * `default` which enables you to use the path:
     * <code>\"/purchase_units/@reference_id=='default'/{attribute-or-object}\"</code>. Merchants and
     * partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs.
     * For more information about processing payments, see <a
     * href="https://developer.paypal.com/docs/checkout/advanced/processing/">checkout</a> or <a
     * href="https://developer.paypal.com/docs/multiparty/checkout/advanced/processing/">multiparty
     * checkout</a>.<blockquote><strong>Note:</strong> For error handling and troubleshooting, see <a
     * href="https://developer.paypal.com/api/rest/reference/orders/v2/errors/#patch-order">Orders v2
     * errors</a>.</blockquote>Patchable attributes or
     * objects:<br/><br/><table><thead><th>Attribute</th><th>Op</th><th>Notes</th></thead><tbody><tr><td><code>intent</code></td><td>replace</td><td></td></tr><tr><td><code>payer</code></td><td>replace,
     * add</td><td>Using replace op for <code>payer</code> will replace the whole <code>payer</code>
     * object with the value sent in
     * request.</td></tr><tr><td><code>purchase_units</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].custom_id</code></td><td>replace, add,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].description</code></td><td>replace,
     * add,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].payee.email</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].shipping.name</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.email_address</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.phone_number</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.options</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.address</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.type</code></td><td>replace,
     * add</td><td></td></tr><tr><td><code>purchase_units[].soft_descriptor</code></td><td>replace,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].amount</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].items</code></td><td>replace,
     * add, remove</td><td></td></tr><tr><td><code>purchase_units[].invoice_id</code></td><td>replace,
     * add,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction.disbursement_mode</code></td><td>replace</td><td>By
     * default, <code>disbursement_mode</code> is
     * <code>INSTANT</code>.</td></tr><tr><td><code>purchase_units[].payment_instruction.payee_receivable_fx_rate_id</code></td><td>replace,
     * add,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction.platform_fees</code></td><td>replace,
     * add,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].supplementary_data.airline</code></td><td>replace,
     * add,
     * remove</td><td></td></tr><tr><td><code>purchase_units[].supplementary_data.card</code></td><td>replace,
     * add,
     * remove</td><td></td></tr><tr><td><code>application_context.client_configuration</code></td><td>replace,
     * add</td><td></td></tr></tbody></table>
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with an empty
     * object in the JSON response body.
     *
     * @throws {@link Orders.PatchOrderError} when the API answers with an error status — narrow on
     * `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    patchOrder(request, options) {
        return this.#rawClient.execute({
            method: "PATCH",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
        }, {
            success: { kind: "empty" },
            errorFactory: Orders.PatchOrderError,
        }, options);
    }
    /**
     * Update or cancel tracking information for an order
     *
     * @remarks
     * Updates or cancels the tracking information for a PayPal order, by ID. Updatable attributes or
     * objects: Attribute Op Notes items replace Using replace op for items will replace the entire
     * items object with the value sent in request. notify_payer replace, add status replace Only
     * patching status to CANCELLED is currently supported.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with an empty
     * object in the JSON response body.
     *
     * @throws {@link Orders.UpdateOrderTrackingError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    updateOrderTracking(request, options) {
        return this.#rawClient.execute({
            method: "PATCH",
            urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/trackers/{tracker_id}"),
            auth: this.#auth.oauth2,
            pathParams: [
                { name: "id", value: request.id, schema: s.string() },
                { name: "tracker_id", value: request.trackerId, schema: s.string() },
            ],
            query: [],
            headers: [
                {
                    name: "PayPal-Auth-Assertion",
                    value: request.payPalAuthAssertion,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
        }, {
            success: { kind: "empty" },
            errorFactory: Orders.UpdateOrderTrackingError,
        }, options);
    }
}
(function (Orders) {
    Orders.authorizeOrderRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        payPalMockResponse: s.optional(s.string()),
        payPalRequestId: s.optional(s.string().check(s.minLength(1), s.maxLength(108))),
        prefer: s.defaulted(s.string().check(s.minLength(1), s.maxLength(25), s.pattern("^[a-zA-Z=,-]*$")), "return=minimal"),
        payPalClientMetadataId: s.optional(s.string().check(s.minLength(1), s.maxLength(36))),
        payPalAuthAssertion: s.optional(s.string()),
        body: s.optional(s.lazy(() => orderAuthorizeRequestSchema)),
    }));
    class AuthorizeOrderError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error6", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.AuthorizeOrderError = AuthorizeOrderError;
    Orders.captureOrderRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        payPalMockResponse: s.optional(s.string()),
        payPalRequestId: s.optional(s.string().check(s.minLength(1), s.maxLength(108))),
        prefer: s.defaulted(s.string().check(s.minLength(1), s.maxLength(25), s.pattern("^[a-zA-Z=,-]*$")), "return=minimal"),
        payPalClientMetadataId: s.optional(s.string().check(s.minLength(1), s.maxLength(36))),
        payPalAuthAssertion: s.optional(s.string()),
        body: s.optional(s.lazy(() => orderCaptureRequestSchema)),
    }));
    class CaptureOrderError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error6", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.CaptureOrderError = CaptureOrderError;
    Orders.confirmOrderRequestParamsSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        payPalClientMetadataId: s.optional(s.string().check(s.minLength(1), s.maxLength(36))),
        payPalAuthAssertion: s.optional(s.string()),
        prefer: s.defaulted(s.string().check(s.minLength(1), s.maxLength(25), s.pattern("^[a-zA-Z=]*$")), "return=minimal"),
        body: s.optional(s.lazy(() => confirmOrderRequestSchema)),
    }));
    class ConfirmOrderError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.ConfirmOrderError = ConfirmOrderError;
    Orders.createOrderRequestSchema = s.lazySchema(() => s.object({
        payPalMockResponse: s.optional(s.string()),
        payPalRequestId: s.optional(s.string().check(s.minLength(1), s.maxLength(108))),
        payPalPartnerAttributionId: s.optional(s.string().check(s.minLength(1), s.maxLength(36))),
        payPalClientMetadataId: s.optional(s.string().check(s.minLength(1), s.maxLength(36))),
        prefer: s.defaulted(s.string().check(s.minLength(1), s.maxLength(25), s.pattern("^[a-zA-Z=,-]*$")), "return=minimal"),
        payPalAuthAssertion: s.optional(s.string()),
        body: orderRequestSchema,
    }));
    class CreateOrderError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.CreateOrderError = CreateOrderError;
    Orders.createOrderTrackingRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        payPalAuthAssertion: s.optional(s.string()),
        body: orderTrackerRequestSchema,
    }));
    class CreateOrderTrackingError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.CreateOrderTrackingError = CreateOrderTrackingError;
    Orders.getOrderRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        fields: s.optional(s.string().check(s.pattern("^[a-z_]*$"))),
        payPalMockResponse: s.optional(s.string()),
        payPalAuthAssertion: s.optional(s.string()),
    }));
    class GetOrderError extends ApiError {
        static errors = [
            { on: 401, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.GetOrderError = GetOrderError;
    Orders.patchOrderRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        payPalMockResponse: s.optional(s.string()),
        payPalAuthAssertion: s.optional(s.string()),
        body: s.optional(s.array(s.lazy(() => patchSchema)).check(s.minLength(0), s.maxLength(32767))),
    }));
    class PatchOrderError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 401, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.PatchOrderError = PatchOrderError;
    Orders.updateOrderTrackingRequestSchema = s.lazySchema(() => s.object({
        id: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        trackerId: s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[A-Z0-9]+$")),
        payPalAuthAssertion: s.optional(s.string()),
        body: s.optional(s.array(s.lazy(() => patchSchema)).check(s.minLength(0), s.maxLength(32767))),
    }));
    class UpdateOrderTrackingError extends ApiError {
        static errors = [
            { on: 400, kind: "error", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 403, kind: "error2", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 404, kind: "error3", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 422, kind: "error4", decode: { kind: "json", schema: errorInternalSchema } },
            { on: 500, kind: "error5", decode: { kind: "json", schema: errorInternalSchema } },
        ];
    }
    Orders.UpdateOrderTrackingError = UpdateOrderTrackingError;
})(Orders || (Orders = {}));
