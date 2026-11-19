import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The customer type associated with the PayPal payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export declare const PayPalPaymentTokenCustomerType: {
    /** The customer vaulting the PayPal payment token is a consumer on the merchant / platform. */
    readonly Consumer: "CONSUMER";
    /** The customer vaulting the PayPal payment token is a business on merchant / platform. */
    readonly Business: "BUSINESS";
};
export type PayPalPaymentTokenCustomerType = (typeof PayPalPaymentTokenCustomerType)[keyof typeof PayPalPaymentTokenCustomerType] | (string & {});
export declare const payPalPaymentTokenCustomerTypeSchema: EnumSchema<PayPalPaymentTokenCustomerType>;
