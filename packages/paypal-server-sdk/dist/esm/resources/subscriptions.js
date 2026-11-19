import { ApiError } from "../core/api-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { activateSubscriptionRequestInternalSchema, } from "../models/activate-subscription-request.js";
import { billingPlanInternalSchema } from "../models/billing-plan.js";
import { cancelSubscriptionRequestInternalSchema, } from "../models/cancel-subscription-request.js";
import { captureSubscriptionRequestInternalSchema, } from "../models/capture-subscription-request.js";
import { createSubscriptionRequestInternalSchema, createSubscriptionRequestSchema, } from "../models/create-subscription-request.js";
import { modifySubscriptionRequestInternalSchema, } from "../models/modify-subscription-request.js";
import { modifySubscriptionResponseInternalSchema, } from "../models/modify-subscription-response.js";
import { patchSchema } from "../models/patch.js";
import { planCollectionInternalSchema } from "../models/plan-collection.js";
import { planRequestInternalSchema } from "../models/plan-request.js";
import { subscriptionCollectionInternalSchema, } from "../models/subscription-collection.js";
import { subscriptionErrorInternalSchema } from "../models/subscription-error.js";
import { subscriptionTransactionDetailsInternalSchema, } from "../models/subscription-transaction-details.js";
import { subscriptionInternalSchema } from "../models/subscription.js";
import { suspendSubscriptionInternalSchema, } from "../models/suspend-subscription.js";
import { transactionsListInternalSchema } from "../models/transactions-list.js";
import { updatePricingSchemesRequestInternalSchema, } from "../models/update-pricing-schemes-request.js";
/**
 * Use the `/subscriptions` resource to create, update, retrieve, and cancel subscriptions and their
 * associated plans.
 */
export class Subscriptions {
    #rawClient;
    #servers;
    #auth;
    constructor(rawClient, servers, auth) {
        this.#rawClient = rawClient;
        this.#servers = servers;
        this.#auth = auth;
    }
    /**
     * Activate plan
     *
     * @remarks
     * Activates a plan, by ID.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.ActivateBillingPlanError} when the API answers with an error
     * status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    activateBillingPlan(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/plans/{id}/activate"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: { kind: "empty" },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.ActivateBillingPlanError,
        }, options);
    }
    /**
     * Activate subscription
     *
     * @remarks
     * Activates the subscription.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.ActivateSubscriptionError} when the API answers with an error
     * status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    activateSubscription(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/activate"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => activateSubscriptionRequestInternalSchema)),
            },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.ActivateSubscriptionError,
        }, options);
    }
    /**
     * Cancel subscription
     *
     * @remarks
     * Cancels the subscription.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.CancelSubscriptionError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    cancelSubscription(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/cancel"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => cancelSubscriptionRequestInternalSchema)),
            },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.CancelSubscriptionError,
        }, options);
    }
    /**
     * Capture authorized payment on subscription
     *
     * @remarks
     * Captures an authorized payment from the subscriber on the subscription.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows subscription details.
     *
     * @throws {@link Subscriptions.CaptureSubscriptionError} when the API answers with an error
     * status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    captureSubscription(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/capture"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => captureSubscriptionRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: subscriptionTransactionDetailsInternalSchema },
            errorFactory: Subscriptions.CaptureSubscriptionError,
        }, options);
    }
    /**
     * Create plan
     *
     * @remarks
     * Creates a plan that defines pricing and billing cycle details for subscriptions.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows billing plan details.
     *
     * @throws {@link Subscriptions.CreateBillingPlanError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    createBillingPlan(request = {}, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/plans"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [],
            headers: [
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => planRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: billingPlanInternalSchema },
            errorFactory: Subscriptions.CreateBillingPlanError,
        }, options);
    }
    /**
     * Create subscription
     *
     * @remarks
     * Creates a subscription.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows subscription details.
     *
     * @throws {@link Subscriptions.CreateSubscriptionError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    createSubscription(request = {}, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [],
            headers: [
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
                { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
                {
                    name: "PayPal-Client-Metadata-Id",
                    value: request.payPalClientMetadataId,
                    schema: s.optional(s.string()),
                },
                { name: "Idempotency-Key", value: uuid(), schema: s.string() },
            ],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => createSubscriptionRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: subscriptionInternalSchema },
            errorFactory: Subscriptions.CreateSubscriptionError,
        }, options);
    }
    /**
     * Deactivate plan
     *
     * @remarks
     * Deactivates a plan, by ID.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.DeactivateBillingPlanError} when the API answers with an error
     * status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    deactivateBillingPlan(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/plans/{id}/deactivate"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: { kind: "empty" },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.DeactivateBillingPlanError,
        }, options);
    }
    /**
     * Show plan details
     *
     * @remarks
     * Shows details for a plan, by ID.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows plan details.
     *
     * @throws {@link Subscriptions.GetBillingPlanError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getBillingPlan(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/billing/plans/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: billingPlanInternalSchema },
            errorFactory: Subscriptions.GetBillingPlanError,
        }, options);
    }
    /**
     * Show subscription details
     *
     * @remarks
     * Shows details for a subscription, by ID.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows subscription details.
     *
     * @throws {@link Subscriptions.GetSubscriptionError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    getSubscription(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [{ name: "fields", value: request.fields, schema: s.optional(s.string()) }],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: subscriptionInternalSchema },
            errorFactory: Subscriptions.GetSubscriptionError,
        }, options);
    }
    /**
     * List plans
     *
     * @remarks
     * Lists billing plans.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that lists billing plans.
     *
     * @throws {@link Subscriptions.ListBillingPlansError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    listBillingPlans(request = {}, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/billing/plans"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [
                { name: "product_id", value: request.productId, schema: s.optional(s.string()) },
                { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 10) },
                { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
                { name: "total_required", value: request.totalRequired, schema: s.defaulted(s.boolean(), false) },
            ],
            headers: [
                { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
            ],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: planCollectionInternalSchema },
            errorFactory: Subscriptions.ListBillingPlansError,
        }, options);
    }
    /**
     * List transactions for subscription
     *
     * @remarks
     * Lists transactions for a subscription.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows subscription details.
     *
     * @throws {@link Subscriptions.ListSubscriptionTransactionsError} when the API answers with an
     * error status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    listSubscriptionTransactions(request, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/transactions"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [
                { name: "start_time", value: request.startTime, schema: s.string() },
                { name: "end_time", value: request.endTime, schema: s.string() },
            ],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: transactionsListInternalSchema },
            errorFactory: Subscriptions.ListSubscriptionTransactionsError,
        }, options);
    }
    /**
     * List subscriptions
     *
     * @remarks
     * List all subscriptions for merchant account.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that lists the subscriptions.
     *
     * @throws {@link Subscriptions.ListSubscriptionsError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    listSubscriptions(request = {}, options) {
        return this.#rawClient.execute({
            method: "GET",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions"),
            auth: this.#auth.oauth2,
            pathParams: [],
            query: [
                { name: "plan_ids", value: request.planIds, schema: s.optional(s.string()) },
                { name: "statuses", value: request.statuses, schema: s.optional(s.string()) },
                { name: "created_after", value: request.createdAfter, schema: s.optional(s.string()) },
                { name: "created_before", value: request.createdBefore, schema: s.optional(s.string()) },
                {
                    name: "status_updated_before",
                    value: request.statusUpdatedBefore,
                    schema: s.optional(s.string()),
                },
                { name: "status_updated_after", value: request.statusUpdatedAfter, schema: s.optional(s.string()) },
                { name: "filter", value: request.filter, schema: s.optional(s.string()) },
                { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 10) },
                { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
                {
                    name: "customer_ids",
                    value: request.customerIds,
                    schema: s.optional(s.array(s.string())),
                    style: "csv",
                },
            ],
            headers: [],
            body: { kind: "empty" },
        }, {
            success: { kind: "json", schema: subscriptionCollectionInternalSchema },
            errorFactory: Subscriptions.ListSubscriptionsError,
        }, options);
    }
    /**
     * Update plan
     *
     * @remarks
     * Updates a plan with the `CREATED` or `ACTIVE` status. For an `INACTIVE` plan, you can make only
     * status updates. You can patch these attributes and objects: Attribute or object Operations
     * description replace payment_preferences.auto_bill_outstanding replace taxes.percentage replace
     * payment_preferences.payment_failure_threshold replace payment_preferences.setup_fee replace
     * payment_preferences.setup_fee_failure_action replace name replace
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.PatchBillingPlanError} when the API answers with an error status —
     * narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    patchBillingPlan(request, options) {
        return this.#rawClient.execute({
            method: "PATCH",
            urlTemplate: this.#servers.default("/v1/billing/plans/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.PatchBillingPlanError,
        }, options);
    }
    /**
     * Update subscription
     *
     * @remarks
     * Updates a subscription which could be in ACTIVE or SUSPENDED status. You can override plan
     * level default attributes by providing customised values for plan path in the patch request. You
     * cannot update attributes that have already completed (Example - trial cycles can’t be updated
     * if completed). Once overridden, changes to plan resource will not impact subscription. Any
     * price update will not impact billing cycles within next 10 days (Applicable only for
     * subscriptions funded by PayPal account). Following are the fields eligible for patch. Attribute
     * or object Operations billing_info.outstanding_balance replace custom_id add,replace
     * plan.billing_cycles[@sequence==n]. pricing_scheme.fixed_price add,replace
     * plan.billing_cycles[@sequence==n]. pricing_scheme.tiers replace
     * plan.billing_cycles[@sequence==n]. total_cycles replace plan.payment_preferences.
     * auto_bill_outstanding replace plan.payment_preferences. payment_failure_threshold replace
     * plan.taxes.inclusive add,replace plan.taxes.percentage add,replace shipping_amount add,replace
     * start_time replace subscriber.shipping_address add,replace subscriber.payment_source (for
     * subscriptions funded by card payments) replace
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.PatchSubscriptionError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    patchSubscription(request, options) {
        return this.#rawClient.execute({
            method: "PATCH",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.PatchSubscriptionError,
        }, options);
    }
    /**
     * Revise plan or quantity of subscription
     *
     * @remarks
     * Updates the quantity of the product or service in a subscription. You can also use this method
     * to switch the plan and update the `shipping_amount`, `shipping_address` values for the
     * subscription. This type of update requires the buyer's consent.
     *
     * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
     * that shows subscription details.
     *
     * @throws {@link Subscriptions.ReviseSubscriptionError} when the API answers with an error status
     * — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    reviseSubscription(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/revise"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => modifySubscriptionRequestInternalSchema)),
            },
        }, {
            success: { kind: "json", schema: modifySubscriptionResponseInternalSchema },
            errorFactory: Subscriptions.ReviseSubscriptionError,
        }, options);
    }
    /**
     * Suspend subscription
     *
     * @remarks
     * Suspends the subscription.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.SuspendSubscriptionError} when the API answers with an error
     * status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    suspendSubscription(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/suspend"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => suspendSubscriptionInternalSchema)),
            },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.SuspendSubscriptionError,
        }, options);
    }
    /**
     * Update pricing
     *
     * @remarks
     * Updates pricing for a plan. For example, you can update a regular billing cycle from $5 per
     * month to $7 per month.
     *
     * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
     * response body.
     *
     * @throws {@link Subscriptions.UpdateBillingPlanPricingSchemesError} when the API answers with an
     * error status — narrow on `err.payload.kind`
     *
     * @throws {@link PayPalServerSdkError} when no usable response was produced: a connection
     * failure, a timeout, a body that would not decode, a value that would not encode, or a
     * credential that could not be obtained
     */
    updateBillingPlanPricingSchemes(request, options) {
        return this.#rawClient.execute({
            method: "POST",
            urlTemplate: this.#servers.default("/v1/billing/plans/{id}/update-pricing-schemes"),
            auth: this.#auth.oauth2,
            pathParams: [{ name: "id", value: request.id, schema: s.string() }],
            query: [],
            headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
            body: {
                kind: "json",
                value: request.body,
                schema: s.optional(s.lazy(() => updatePricingSchemesRequestInternalSchema)),
            },
        }, {
            success: { kind: "empty" },
            errorFactory: Subscriptions.UpdateBillingPlanPricingSchemesError,
        }, options);
    }
}
(function (Subscriptions) {
    class ActivateBillingPlanError extends ApiError {
        static errors = [
            {
                on: 401,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.ActivateBillingPlanError = ActivateBillingPlanError;
    class ActivateSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.ActivateSubscriptionError = ActivateSubscriptionError;
    class CancelSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.CancelSubscriptionError = CancelSubscriptionError;
    class CaptureSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.CaptureSubscriptionError = CaptureSubscriptionError;
    class CreateBillingPlanError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.CreateBillingPlanError = CreateBillingPlanError;
    Subscriptions.createSubscriptionRequestParamsSchema = s.lazySchema(() => s.object({
        prefer: s.defaulted(s.string(), "return=minimal"),
        payPalRequestId: s.optional(s.string()),
        payPalClientMetadataId: s.optional(s.string().check(s.minLength(1), s.maxLength(36))),
        body: s.optional(s.lazy(() => createSubscriptionRequestSchema)),
    }));
    class CreateSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.CreateSubscriptionError = CreateSubscriptionError;
    class DeactivateBillingPlanError extends ApiError {
        static errors = [
            {
                on: 401,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.DeactivateBillingPlanError = DeactivateBillingPlanError;
    class GetBillingPlanError extends ApiError {
        static errors = [
            {
                on: 401,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.GetBillingPlanError = GetBillingPlanError;
    Subscriptions.getSubscriptionRequestSchema = s.lazySchema(() => s.object({
        id: s.string(),
        fields: s.optional(s.string().check(s.minLength(1), s.maxLength(100))),
    }));
    class GetSubscriptionError extends ApiError {
        static errors = [
            {
                on: 401,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.GetSubscriptionError = GetSubscriptionError;
    Subscriptions.listBillingPlansRequestSchema = s.lazySchema(() => s.object({
        productId: s.optional(s.string().check(s.minLength(6), s.maxLength(50))),
        pageSize: s.defaulted(s.int().check(s.gte(1), s.lte(20)), 10),
        page: s.defaulted(s.int().check(s.gte(1), s.lte(100000)), 1),
        totalRequired: s.defaulted(s.boolean(), false),
        prefer: s.defaulted(s.string(), "return=minimal"),
    }));
    class ListBillingPlansError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.ListBillingPlansError = ListBillingPlansError;
    Subscriptions.listSubscriptionTransactionsRequestSchema = s.lazySchema(() => s.object({
        id: s.string(),
        startTime: s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$")),
        endTime: s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$")),
    }));
    class ListSubscriptionTransactionsError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.ListSubscriptionTransactionsError = ListSubscriptionTransactionsError;
    Subscriptions.listSubscriptionsRequestSchema = s.lazySchema(() => s.object({
        planIds: s.optional(s.string()),
        statuses: s.optional(s.string().check(s.minLength(1), s.maxLength(70), s.pattern("^[A-Z_,]+$"))),
        createdAfter: s.optional(s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
        createdBefore: s.optional(s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
        statusUpdatedBefore: s.optional(s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
        statusUpdatedAfter: s.optional(s
            .string()
            .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
        filter: s.optional(s.string().check(s.minLength(0), s.maxLength(100))),
        pageSize: s.defaulted(s.int().check(s.gte(1), s.lte(20)), 10),
        page: s.defaulted(s.int().check(s.gte(1), s.lte(10000000)), 1),
        customerIds: s.optional(s
            .array(s.string().check(s.minLength(1), s.maxLength(22), s.pattern("^[0-9a-zA-Z_-]+$")))
            .check(s.minLength(1), s.maxLength(10))),
    }));
    class ListSubscriptionsError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.ListSubscriptionsError = ListSubscriptionsError;
    class PatchBillingPlanError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.PatchBillingPlanError = PatchBillingPlanError;
    class PatchSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.PatchSubscriptionError = PatchSubscriptionError;
    class ReviseSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.ReviseSubscriptionError = ReviseSubscriptionError;
    class SuspendSubscriptionError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.SuspendSubscriptionError = SuspendSubscriptionError;
    class UpdateBillingPlanPricingSchemesError extends ApiError {
        static errors = [
            {
                on: 400,
                kind: "subscriptionError",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 401,
                kind: "subscriptionError2",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 403,
                kind: "subscriptionError3",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 404,
                kind: "subscriptionError4",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 422,
                kind: "subscriptionError5",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
            {
                on: 500,
                kind: "subscriptionError6",
                decode: { kind: "json", schema: subscriptionErrorInternalSchema },
            },
        ];
    }
    Subscriptions.UpdateBillingPlanPricingSchemesError = UpdateBillingPlanPricingSchemesError;
})(Subscriptions || (Subscriptions = {}));
