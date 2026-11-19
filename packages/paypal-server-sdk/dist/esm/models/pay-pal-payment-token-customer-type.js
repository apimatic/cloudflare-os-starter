import * as s from "../core/validation/index.js";
/**
 * The customer type associated with the PayPal payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export const PayPalPaymentTokenCustomerType = {
    /** The customer vaulting the PayPal payment token is a consumer on the merchant / platform. */
    Consumer: "CONSUMER",
    /** The customer vaulting the PayPal payment token is a business on merchant / platform. */
    Business: "BUSINESS",
};
export const payPalPaymentTokenCustomerTypeSchema = s.enumOf(PayPalPaymentTokenCustomerType);
