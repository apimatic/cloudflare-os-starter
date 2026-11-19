import * as s from "../core/validation/index.js";
/** Indicates the type of the stored payment_source payment. */
export const StoredPaymentSourcePaymentType = {
    /** One Time payment such as online purchase or donation. (e.g. Checkout with one-click). */
    OneTime: "ONE_TIME",
    /**
     * Payment which is part of a series of payments with fixed or variable amounts, following a fixed
     * time interval. (e.g. Subscription payments).
     */
    Recurring: "RECURRING",
    /**
     * Payment which is part of a series of payments that occur on a non-fixed schedule and/or have
     * variable amounts. (e.g. Account Topup payments).
     */
    Unscheduled: "UNSCHEDULED",
};
export const storedPaymentSourcePaymentTypeSchema = s.enumOf(StoredPaymentSourcePaymentType);
//# sourceMappingURL=stored-payment-source-payment-type.js.map