import type { EnumSchema } from "../core/validation/schema.js";
/**
 * DEPRECATED. DEPRECATED. The type of landing page to show on the PayPal site for customer
 * checkout. The fields in `application_context` are now available in the `experience_context`
 * object under the `payment_source` which supports them (eg.
 * `payment_source.paypal.experience_context.landing_page`). Please specify this field in the
 * `experience_context` object instead of the `application_context` object.
 */
export declare const OrderApplicationContextLandingPage: {
    /**
     * When the customer clicks PayPal Checkout, the customer is redirected to a page to log in to
     * PayPal and approve the payment.
     */
    readonly Login: "LOGIN";
    /**
     * When the customer clicks PayPal Checkout, the customer is redirected to a page to enter credit
     * or debit card and other relevant billing information required to complete the purchase.
     */
    readonly Billing: "BILLING";
    /**
     * When the customer clicks PayPal Checkout, the customer is redirected to either a page to log in
     * to PayPal and approve the payment or to a page to enter credit or debit card and other relevant
     * billing information required to complete the purchase, depending on their previous interaction
     * with PayPal.
     */
    readonly NoPreference: "NO_PREFERENCE";
};
export type OrderApplicationContextLandingPage = (typeof OrderApplicationContextLandingPage)[keyof typeof OrderApplicationContextLandingPage] | (string & {});
export declare const orderApplicationContextLandingPageSchema: EnumSchema<OrderApplicationContextLandingPage>;
