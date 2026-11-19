import * as s from "../core/validation/index.js";
/** Expected business/charge model for the billing agreement. */
export const UsagePatternPaymentMethodTokens = {
    /** On-demand instant payments – non-recurring, pre-paid, variable amount, variable frequency. */
    Immediate: "IMMEDIATE",
    /** Pay after use, non-recurring post-paid, variable amount, irregular frequency. */
    Deferred: "DEFERRED",
    /** Pay upfront fixed or variable amount on a fixed date before the goods/service is delivered. */
    RecurringPrepaid: "RECURRING_PREPAID",
    /** Pay on a fixed date based on usage or consumption after the goods/service is delivered. */
    RecurringPostpaid: "RECURRING_POSTPAID",
    /**
     * Charge payer when the set amount is reached or monthly billing cycle, whichever comes first,
     * before the goods/service is delivered.
     */
    ThresholdPrepaid: "THRESHOLD_PREPAID",
    /**
     * Charge payer when the set amount is reached or monthly billing cycle, whichever comes first,
     * after the goods/service is delivered.
     */
    ThresholdPostpaid: "THRESHOLD_POSTPAID",
    /**
     * Merchant-managed installment plan when the amount to be paid and the billing frequency are
     * fixed, but there is a defined number of payments with the payment due after the goods/services
     * are delivered.
     */
    UnscheduledPostpaid: "UNSCHEDULED_POSTPAID",
    /**
     * Unscheduled card on file plan where the merchant can bill buyer upfront based on an agreed
     * logic, but amount due and frequency can vary. Inclusive of automatic reload plans.
     */
    UnscheduledPrepaid: "UNSCHEDULED_PREPAID",
    /**
     * Subscription plan where the amount due and the billing frequency are fixed, and there is no
     * defined duration with the payment due before the good/service is delivered.
     */
    SubscriptionPrepaid: "SUBSCRIPTION_PREPAID",
    /**
     * Subscription plan where the amount due and the billing frequency are fixed, and there is no
     * defined duration with the payment due after the goods/services are delivered.
     */
    SubscriptionPostpaid: "SUBSCRIPTION_POSTPAID",
    /**
     * Merchant-managed installment plan when the amount to be paid and the billing frequency are
     * fixed, but there is a defined number of payments with the payment due after the goods/services
     * are delivered.
     */
    InstallmentPostpaid: "INSTALLMENT_POSTPAID",
    /**
     * Merchant-managed installment plan when the amount to be paid and the billing frequency are
     * fixed, but there is a defined number of payments with the payment due before the good/service
     * is delivered.
     */
    InstallmentPrepaid: "INSTALLMENT_PREPAID",
};
export const usagePatternPaymentMethodTokensSchema = s.enumOf(UsagePatternPaymentMethodTokens);
