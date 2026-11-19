import type { EnumSchema } from "../core/validation/schema.js";
/** Indicates the type of the stored payment_source payment. */
export declare const StoredPaymentSourcePaymentType: {
    /** One Time payment such as online purchase or donation. (e.g. Checkout with one-click). */
    readonly OneTime: "ONE_TIME";
    /**
     * Payment which is part of a series of payments with fixed or variable amounts, following a fixed
     * time interval. (e.g. Subscription payments).
     */
    readonly Recurring: "RECURRING";
    /**
     * Payment which is part of a series of payments that occur on a non-fixed schedule and/or have
     * variable amounts. (e.g. Account Topup payments).
     */
    readonly Unscheduled: "UNSCHEDULED";
};
export type StoredPaymentSourcePaymentType = (typeof StoredPaymentSourcePaymentType)[keyof typeof StoredPaymentSourcePaymentType] | (string & {});
export declare const storedPaymentSourcePaymentTypeSchema: EnumSchema<StoredPaymentSourcePaymentType>;
