import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { SetupFeeFailureAction } from "./setup-fee-failure-action.js";
/** The payment preferences for a subscription. */
export type PaymentPreferences = {
    /**
     * Indicates whether to automatically bill the outstanding amount in the next billing cycle.
     *
     * @default true
     */
    autoBillOutstanding?: boolean;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    setupFee?: Money;
    /**
     * The action to take on the subscription if the initial payment for the setup fails.
     *
     * @default SetupFeeFailureAction.Cancel
     */
    setupFeeFailureAction?: SetupFeeFailureAction;
    /**
     * The maximum number of payment failures before a subscription is suspended. For example, if
     * `payment_failure_threshold` is `2`, the subscription automatically updates to the `SUSPEND`
     * state if two consecutive payments fail.
     *
     * @default 0
     */
    paymentFailureThreshold?: number;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentPreferencesInternalSchema: Schema<PaymentPreferences>;
export declare const paymentPreferencesSchema: Schema<PaymentPreferences>;
