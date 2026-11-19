import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import type { Schema } from "../core/validation/schema.js";
import { type ActivateSubscriptionRequest } from "../models/activate-subscription-request.js";
import { type BillingPlan } from "../models/billing-plan.js";
import { type CancelSubscriptionRequest } from "../models/cancel-subscription-request.js";
import { type CaptureSubscriptionRequest } from "../models/capture-subscription-request.js";
import { type CreateSubscriptionRequest } from "../models/create-subscription-request.js";
import { type ModifySubscriptionRequest } from "../models/modify-subscription-request.js";
import { type ModifySubscriptionResponse } from "../models/modify-subscription-response.js";
import { type Patch } from "../models/patch.js";
import { type PlanCollection } from "../models/plan-collection.js";
import { type PlanRequest } from "../models/plan-request.js";
import { type SubscriptionCollection } from "../models/subscription-collection.js";
import { type SubscriptionError } from "../models/subscription-error.js";
import { type SubscriptionTransactionDetails } from "../models/subscription-transaction-details.js";
import { type Subscription } from "../models/subscription.js";
import { type SuspendSubscription } from "../models/suspend-subscription.js";
import { type TransactionsList } from "../models/transactions-list.js";
import { type UpdatePricingSchemesRequest } from "../models/update-pricing-schemes-request.js";
import type { Servers } from "../servers.js";
/**
 * Use the `/subscriptions` resource to create, update, retrieve, and cancel subscriptions and their
 * associated plans.
 */
export declare class Subscriptions {
    #private;
    constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes);
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
    activateBillingPlan(request: Subscriptions.ActivateBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.ActivateBillingPlanError>;
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
    activateSubscription(request: Subscriptions.ActivateSubscriptionRequestParams, options?: RequestOptions): ApiPromise<undefined, Subscriptions.ActivateSubscriptionError>;
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
    cancelSubscription(request: Subscriptions.CancelSubscriptionRequestParams, options?: RequestOptions): ApiPromise<undefined, Subscriptions.CancelSubscriptionError>;
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
    captureSubscription(request: Subscriptions.CaptureSubscriptionRequestParams, options?: RequestOptions): ApiPromise<SubscriptionTransactionDetails, Subscriptions.CaptureSubscriptionError>;
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
    createBillingPlan(request?: Subscriptions.CreateBillingPlanRequest, options?: RequestOptions): ApiPromise<BillingPlan, Subscriptions.CreateBillingPlanError>;
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
    createSubscription(request?: Subscriptions.CreateSubscriptionRequestParams, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.CreateSubscriptionError>;
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
    deactivateBillingPlan(request: Subscriptions.DeactivateBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.DeactivateBillingPlanError>;
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
    getBillingPlan(request: Subscriptions.GetBillingPlanRequest, options?: RequestOptions): ApiPromise<BillingPlan, Subscriptions.GetBillingPlanError>;
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
    getSubscription(request: Subscriptions.GetSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.GetSubscriptionError>;
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
    listBillingPlans(request?: Subscriptions.ListBillingPlansRequest, options?: RequestOptions): ApiPromise<PlanCollection, Subscriptions.ListBillingPlansError>;
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
    listSubscriptionTransactions(request: Subscriptions.ListSubscriptionTransactionsRequest, options?: RequestOptions): ApiPromise<TransactionsList, Subscriptions.ListSubscriptionTransactionsError>;
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
    listSubscriptions(request?: Subscriptions.ListSubscriptionsRequest, options?: RequestOptions): ApiPromise<SubscriptionCollection, Subscriptions.ListSubscriptionsError>;
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
    patchBillingPlan(request: Subscriptions.PatchBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.PatchBillingPlanError>;
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
    patchSubscription(request: Subscriptions.PatchSubscriptionRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.PatchSubscriptionError>;
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
    reviseSubscription(request: Subscriptions.ReviseSubscriptionRequest, options?: RequestOptions): ApiPromise<ModifySubscriptionResponse, Subscriptions.ReviseSubscriptionError>;
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
    suspendSubscription(request: Subscriptions.SuspendSubscriptionRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.SuspendSubscriptionError>;
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
    updateBillingPlanPricingSchemes(request: Subscriptions.UpdateBillingPlanPricingSchemesRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.UpdateBillingPlanPricingSchemesError>;
}
export declare namespace Subscriptions {
    type ActivateBillingPlanRequest = {
        /** The ID of the plan. */
        id: string;
    };
    class ActivateBillingPlanError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<ActivateBillingPlanError>;
    }
    type ActivateSubscriptionRequestParams = {
        /** The ID of the subscription. */
        id: string;
        body?: ActivateSubscriptionRequest;
    };
    class ActivateSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<ActivateSubscriptionError>;
    }
    type CancelSubscriptionRequestParams = {
        /** The ID of the subscription. */
        id: string;
        body?: CancelSubscriptionRequest;
    };
    class CancelSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<CancelSubscriptionError>;
    }
    type CaptureSubscriptionRequestParams = {
        /** The ID of the subscription. */
        id: string;
        /** The server stores keys for 72 hours. */
        payPalRequestId?: string;
        body?: CaptureSubscriptionRequest;
    };
    class CaptureSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<CaptureSubscriptionError>;
    }
    type CreateBillingPlanRequest = {
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
        /** The server stores keys for 72 hours. */
        payPalRequestId?: string;
        body?: PlanRequest;
    };
    class CreateBillingPlanError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<CreateBillingPlanError>;
    }
    type CreateSubscriptionRequestParams = {
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
        /** The server stores keys for 72 hours. */
        payPalRequestId?: string;
        /**
         * The PayPal Client Metadata Id(CMID) is used to provide device-specific information to
         * PayPal's risk engine. This is crucial for transactions that require device-specific risk
         * assessments. Merchants typically use the Paypal SDK that automatically submits the CMID or
         * they use tools like Fraudnet JS for web or Magnes JS for mobile to generate the CMID on the
         * frontend and then pass it to the API as part of the request headers.
         */
        payPalClientMetadataId?: string;
        body?: CreateSubscriptionRequest;
    };
    const createSubscriptionRequestParamsSchema: Schema<CreateSubscriptionRequestParams>;
    class CreateSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<CreateSubscriptionError>;
    }
    type DeactivateBillingPlanRequest = {
        /** The ID of the plan. */
        id: string;
    };
    class DeactivateBillingPlanError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<DeactivateBillingPlanError>;
    }
    type GetBillingPlanRequest = {
        /** The ID of the plan. */
        id: string;
    };
    class GetBillingPlanError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<GetBillingPlanError>;
    }
    type GetSubscriptionRequest = {
        /** The ID of the subscription. */
        id: string;
        /**
         * List of fields that are to be returned in the response. Possible value for fields are
         * last_failed_payment and plan.
         */
        fields?: string;
    };
    const getSubscriptionRequestSchema: Schema<GetSubscriptionRequest>;
    class GetSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<GetSubscriptionError>;
    }
    type ListBillingPlansRequest = {
        /** Filters the response by a Product ID. */
        productId?: string;
        /** The number of items to return in the response. @default 10 */
        pageSize?: number;
        /**
         * A non-zero integer which is the start index of the entire list of items to return in the
         * response. The combination of `page=1` and `page_size=20` returns the first 20 items. The
         * combination of `page=2` and `page_size=20` returns the next 20 items.
         *
         * @default 1
         */
        page?: number;
        /** Indicates whether to show the total count in the response. @default false */
        totalRequired?: boolean;
        /**
         * The preferred server response upon successful completion of the request. Value is:
         * return=minimal. The server returns a minimal response to optimize communication between the
         * API caller and the server. A minimal response includes the id, name, description and HATEOAS
         * links. return=representation. The server returns a complete resource representation,
         * including the current state of the resource.
         *
         * @default "return=minimal"
         */
        prefer?: string;
    };
    const listBillingPlansRequestSchema: Schema<ListBillingPlansRequest>;
    class ListBillingPlansError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<ListBillingPlansError>;
    }
    type ListSubscriptionTransactionsRequest = {
        /** The ID of the subscription. */
        id: string;
        /** The start time of the range of transactions to list. */
        startTime: string;
        /** The end time of the range of transactions to list. */
        endTime: string;
    };
    const listSubscriptionTransactionsRequestSchema: Schema<ListSubscriptionTransactionsRequest>;
    class ListSubscriptionTransactionsError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<ListSubscriptionTransactionsError>;
    }
    type ListSubscriptionsRequest = {
        /**
         * Filters the response by list of plan IDs. Filter supports upto 70 plan IDs. URLs should not
         * exceed a length of 2000 characters.
         */
        planIds?: string;
        /** Filters the response by list of subscription statuses. */
        statuses?: string;
        /** Filters the response by subscription creation start time for a range of subscriptions. */
        createdAfter?: string;
        /** Filters the response by subscription creation end time for a range of subscriptions. */
        createdBefore?: string;
        /** Filters the response by status update start time for a range of subscriptions. */
        statusUpdatedBefore?: string;
        /** Filters the response by status update end time for a range of subscriptions. */
        statusUpdatedAfter?: string;
        /**
         * Filter the response using complex expressions that could use comparison operators like ge,
         * gt, le, lt and logical operators such as 'and' and 'or'.
         */
        filter?: string;
        /** The number of items to return in the response. @default 10 */
        pageSize?: number;
        /**
         * A non-zero integer which is the start index of the entire list of items to return in the
         * response. The combination of `page=1` and `page_size=20` returns the first 20 items. The
         * combination of `page=2` and `page_size=20` returns the next 20 items.
         *
         * @default 1
         */
        page?: number;
        /** Filters the response by comma separated vault customer IDs (FSS subscriptions only). */
        customerIds?: string[];
    };
    const listSubscriptionsRequestSchema: Schema<ListSubscriptionsRequest>;
    class ListSubscriptionsError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<ListSubscriptionsError>;
    }
    type PatchBillingPlanRequest = {
        /** The ID of the plan. */
        id: string;
        body?: Patch[];
    };
    class PatchBillingPlanError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<PatchBillingPlanError>;
    }
    type PatchSubscriptionRequest = {
        /** The ID for the subscription. */
        id: string;
        body?: Patch[];
    };
    class PatchSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<PatchSubscriptionError>;
    }
    type ReviseSubscriptionRequest = {
        /** The ID of the subscription. */
        id: string;
        body?: ModifySubscriptionRequest;
    };
    class ReviseSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<ReviseSubscriptionError>;
    }
    type SuspendSubscriptionRequest = {
        /** The ID of the subscription. */
        id: string;
        body?: SuspendSubscription;
    };
    class SuspendSubscriptionError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<SuspendSubscriptionError>;
    }
    type UpdateBillingPlanPricingSchemesRequest = {
        /** The ID for the plan. */
        id: string;
        body?: UpdatePricingSchemesRequest;
    };
    class UpdateBillingPlanPricingSchemesError extends ApiError {
        readonly payload: Declared<"subscriptionError", SubscriptionError> | Declared<"subscriptionError2", SubscriptionError> | Declared<"subscriptionError3", SubscriptionError> | Declared<"subscriptionError4", SubscriptionError> | Declared<"subscriptionError5", SubscriptionError> | Declared<"subscriptionError6", SubscriptionError> | Undeclared;
        static readonly errors: ErrorDecoders<UpdateBillingPlanPricingSchemesError>;
    }
}
