import * as s from "../core/validation/index.js";
/** The type of the payment credential. Currently, only CARD is supported. */
export const GooglePayPaymentMethod = {
    /** CARD is the only value that Google Pay accepts. */
    Card: "CARD",
};
export const googlePayPaymentMethodSchema = s.enumOf(GooglePayPaymentMethod);
//# sourceMappingURL=google-pay-payment-method.js.map