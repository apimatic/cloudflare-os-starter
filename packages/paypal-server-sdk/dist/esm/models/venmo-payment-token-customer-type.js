import * as s from "../core/validation/index.js";
/**
 * The customer type associated with the Venmo payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export const VenmoPaymentTokenCustomerType = {
    /** The customer vaulting the Venmo payment token is a consumer on the merchant / platform. */
    Consumer: "CONSUMER",
    /** The customer vaulting the Venmo payment token is a business on merchant / platform. */
    Business: "BUSINESS",
};
export const venmoPaymentTokenCustomerTypeSchema = s.enumOf(VenmoPaymentTokenCustomerType);
//# sourceMappingURL=venmo-payment-token-customer-type.js.map