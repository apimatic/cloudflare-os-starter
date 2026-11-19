import * as s from "../core/validation/index.js";
import { storedPaymentSourceInternalSchema, storedPaymentSourceSchema, } from "./stored-payment-source.js";
const orderConfirmApplicationContextProperties = {
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    storedPaymentSource: s.optional(s.lazy(() => storedPaymentSourceInternalSchema)),
    _keysMap: {
        brandName: "brand_name",
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
        storedPaymentSource: "stored_payment_source",
    },
};
export const orderConfirmApplicationContextInternalSchema = s.object(orderConfirmApplicationContextProperties, {
    additionalProperties: s.json(),
});
export const orderConfirmApplicationContextSchema = s.lazySchema(() => s.object({
    ...orderConfirmApplicationContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.optional(s.string().check(s.minLength(10), s.maxLength(4000), s.url())),
    cancelUrl: s.optional(s.string().check(s.minLength(10), s.maxLength(4000), s.url())),
    storedPaymentSource: s.optional(s.lazy(() => storedPaymentSourceSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=order-confirm-application-context.js.map