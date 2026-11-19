import * as s from "../core/validation/index.js";
import { OrderApplicationContextLandingPage, orderApplicationContextLandingPageSchema, } from "./order-application-context-landing-page.js";
import { OrderApplicationContextShippingPreference, orderApplicationContextShippingPreferenceSchema, } from "./order-application-context-shipping-preference.js";
import { OrderApplicationContextUserAction, orderApplicationContextUserActionSchema, } from "./order-application-context-user-action.js";
import { paymentMethodPreferenceSchema } from "./payment-method-preference.js";
import { storedPaymentSourceInternalSchema, storedPaymentSourceSchema, } from "./stored-payment-source.js";
const orderApplicationContextProperties = {
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    landingPage: s.defaulted(orderApplicationContextLandingPageSchema, OrderApplicationContextLandingPage.NoPreference),
    shippingPreference: s.defaulted(orderApplicationContextShippingPreferenceSchema, OrderApplicationContextShippingPreference.GetFromFile),
    userAction: s.defaulted(orderApplicationContextUserActionSchema, OrderApplicationContextUserAction.Continue),
    paymentMethod: s.optional(s.lazy(() => paymentMethodPreferenceSchema)),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    storedPaymentSource: s.optional(s.lazy(() => storedPaymentSourceInternalSchema)),
    _keysMap: {
        brandName: "brand_name",
        landingPage: "landing_page",
        shippingPreference: "shipping_preference",
        userAction: "user_action",
        paymentMethod: "payment_method",
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
        storedPaymentSource: "stored_payment_source",
    },
};
export const orderApplicationContextInternalSchema = s.object(orderApplicationContextProperties, { additionalProperties: s.json() });
export const orderApplicationContextSchema = s.lazySchema(() => s.object({
    ...orderApplicationContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.optional(s.string().check(s.url())),
    cancelUrl: s.optional(s.string().check(s.url())),
    storedPaymentSource: s.optional(s.lazy(() => storedPaymentSourceSchema)),
}, { additionalProperties: s.json() }));
