import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The customer type associated with the Venmo payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export declare const VenmoPaymentTokenCustomerType: {
    /** The customer vaulting the Venmo payment token is a consumer on the merchant / platform. */
    readonly Consumer: "CONSUMER";
    /** The customer vaulting the Venmo payment token is a business on merchant / platform. */
    readonly Business: "BUSINESS";
};
export type VenmoPaymentTokenCustomerType = (typeof VenmoPaymentTokenCustomerType)[keyof typeof VenmoPaymentTokenCustomerType] | (string & {});
export declare const venmoPaymentTokenCustomerTypeSchema: EnumSchema<VenmoPaymentTokenCustomerType>;
