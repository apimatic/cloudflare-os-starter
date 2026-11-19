import type { EnumSchema } from "../core/validation/schema.js";
/** Expected business/charge model for the billing agreement. */
export declare const UsagePatternPaymentMethodTokens: {
    /** On-demand instant payments – non-recurring, pre-paid, variable amount, variable frequency. */
    readonly Immediate: "IMMEDIATE";
    /** Pay after use, non-recurring post-paid, variable amount, irregular frequency. */
    readonly Deferred: "DEFERRED";
    /** Pay upfront fixed or variable amount on a fixed date before the goods/service is delivered. */
    readonly RecurringPrepaid: "RECURRING_PREPAID";
    /** Pay on a fixed date based on usage or consumption after the goods/service is delivered. */
    readonly RecurringPostpaid: "RECURRING_POSTPAID";
    /**
     * Charge payer when the set amount is reached or monthly billing cycle, whichever comes first,
     * before the goods/service is delivered.
     */
    readonly ThresholdPrepaid: "THRESHOLD_PREPAID";
    /**
     * Charge payer when the set amount is reached or monthly billing cycle, whichever comes first,
     * after the goods/service is delivered.
     */
    readonly ThresholdPostpaid: "THRESHOLD_POSTPAID";
    /**
     * Merchant-managed installment plan when the amount to be paid and the billing frequency are
     * fixed, but there is a defined number of payments with the payment due after the goods/services
     * are delivered.
     */
    readonly UnscheduledPostpaid: "UNSCHEDULED_POSTPAID";
    /**
     * Unscheduled card on file plan where the merchant can bill buyer upfront based on an agreed
     * logic, but amount due and frequency can vary. Inclusive of automatic reload plans.
     */
    readonly UnscheduledPrepaid: "UNSCHEDULED_PREPAID";
    /**
     * Subscription plan where the amount due and the billing frequency are fixed, and there is no
     * defined duration with the payment due before the good/service is delivered.
     */
    readonly SubscriptionPrepaid: "SUBSCRIPTION_PREPAID";
    /**
     * Subscription plan where the amount due and the billing frequency are fixed, and there is no
     * defined duration with the payment due after the goods/services are delivered.
     */
    readonly SubscriptionPostpaid: "SUBSCRIPTION_POSTPAID";
    /**
     * Merchant-managed installment plan when the amount to be paid and the billing frequency are
     * fixed, but there is a defined number of payments with the payment due after the goods/services
     * are delivered.
     */
    readonly InstallmentPostpaid: "INSTALLMENT_POSTPAID";
    /**
     * Merchant-managed installment plan when the amount to be paid and the billing frequency are
     * fixed, but there is a defined number of payments with the payment due before the good/service
     * is delivered.
     */
    readonly InstallmentPrepaid: "INSTALLMENT_PREPAID";
};
export type UsagePatternPaymentMethodTokens = (typeof UsagePatternPaymentMethodTokens)[keyof typeof UsagePatternPaymentMethodTokens] | (string & {});
export declare const usagePatternPaymentMethodTokensSchema: EnumSchema<UsagePatternPaymentMethodTokens>;
