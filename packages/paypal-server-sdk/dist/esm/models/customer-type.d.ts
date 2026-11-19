import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The customer type associated with a digital wallet payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export declare const CustomerType: {
    /** The customer vaulting the PayPal payment token is a consumer on the merchant / platform. */
    readonly Consumer: "CONSUMER";
    /** The customer vaulting the PayPal payment token is a business on merchant / platform. */
    readonly Business: "BUSINESS";
};
export type CustomerType = (typeof CustomerType)[keyof typeof CustomerType] | (string & {});
export declare const customerTypeSchema: EnumSchema<CustomerType>;
