import * as s from "../core/validation/index.js";
/**
 * The customer type associated with a digital wallet payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer.
 */
export const CustomerType = {
    /** The customer vaulting the PayPal payment token is a consumer on the merchant / platform. */
    Consumer: "CONSUMER",
    /** The customer vaulting the PayPal payment token is a business on merchant / platform. */
    Business: "BUSINESS",
};
export const customerTypeSchema = s.enumOf(CustomerType);
//# sourceMappingURL=customer-type.js.map