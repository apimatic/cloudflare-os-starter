import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
/** The one-time charge info at the time of checkout. */
export type OneTimeCharge = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    setupFee?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    shippingAmount?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    taxes?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    productPrice?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    subtotal?: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    totalAmount: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const oneTimeChargeInternalSchema: Schema<OneTimeCharge>;
export declare const oneTimeChargeSchema: Schema<OneTimeCharge>;
