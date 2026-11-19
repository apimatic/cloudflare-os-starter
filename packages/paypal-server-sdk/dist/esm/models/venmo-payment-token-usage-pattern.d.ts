import type { EnumSchema } from "../core/validation/schema.js";
/** Expected business/pricing model for the billing agreement. */
export declare const VenmoPaymentTokenUsagePattern: {
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
};
export type VenmoPaymentTokenUsagePattern = (typeof VenmoPaymentTokenUsagePattern)[keyof typeof VenmoPaymentTokenUsagePattern] | (string & {});
export declare const venmoPaymentTokenUsagePatternSchema: EnumSchema<VenmoPaymentTokenUsagePattern>;
