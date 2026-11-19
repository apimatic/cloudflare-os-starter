import * as s from "../core/validation/index.js";
import { ApplicationContextShippingPreference, applicationContextShippingPreferenceSchema, } from "./application-context-shipping-preference.js";
import { ApplicationContextUserAction, applicationContextUserActionSchema, } from "./application-context-user-action.js";
import { paymentMethodSchema } from "./payment-method.js";
const subscriptionApplicationContextProperties = {
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.defaulted(applicationContextShippingPreferenceSchema, ApplicationContextShippingPreference.GetFromFile),
    userAction: s.defaulted(applicationContextUserActionSchema, ApplicationContextUserAction.SubscribeNow),
    paymentMethod: s.optional(s.lazy(() => paymentMethodSchema)),
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
        brandName: "brand_name",
        shippingPreference: "shipping_preference",
        userAction: "user_action",
        paymentMethod: "payment_method",
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const subscriptionApplicationContextInternalSchema = s.object(subscriptionApplicationContextProperties, {
    additionalProperties: s.json(),
});
export const subscriptionApplicationContextSchema = s.lazySchema(() => s.object({
    ...subscriptionApplicationContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.string().check(s.minLength(10), s.maxLength(4000), s.url()),
    cancelUrl: s.string().check(s.minLength(10), s.maxLength(4000), s.url()),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-application-context.js.map