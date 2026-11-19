import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The intent to either capture payment immediately or authorize a payment for an order after order
 * creation.
 */
export declare const CheckoutPaymentIntent: {
    /** The merchant intends to capture payment immediately after the customer makes a payment. */
    readonly Capture: "CAPTURE";
    /**
     * The merchant intends to authorize a payment and place funds on hold after the customer makes a
     * payment. Authorized payments are best captured within three days of authorization but are
     * available to capture for up to 29 days. After the three-day honor period, the original
     * authorized payment expires and you must re-authorize the payment. You must make a separate
     * request to capture payments on demand. This intent is not supported when you have more than one
     * `purchase_unit` within your order.
     */
    readonly Authorize: "AUTHORIZE";
};
export type CheckoutPaymentIntent = (typeof CheckoutPaymentIntent)[keyof typeof CheckoutPaymentIntent] | (string & {});
export declare const checkoutPaymentIntentSchema: EnumSchema<CheckoutPaymentIntent>;
