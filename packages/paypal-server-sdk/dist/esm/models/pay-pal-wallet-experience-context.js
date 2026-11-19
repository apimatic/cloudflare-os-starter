import * as s from "../core/validation/index.js";
import { appSwitchContextInternalSchema, appSwitchContextSchema, } from "./app-switch-context.js";
import { callbackConfigurationInternalSchema, callbackConfigurationSchema, } from "./callback-configuration.js";
import { PayPalExperienceLandingPage, payPalExperienceLandingPageSchema, } from "./pay-pal-experience-landing-page.js";
import { PayPalExperienceUserAction, payPalExperienceUserActionSchema, } from "./pay-pal-experience-user-action.js";
import { PayPalWalletContactPreference, payPalWalletContactPreferenceSchema, } from "./pay-pal-wallet-contact-preference.js";
import { PayPalWalletContextShippingPreference, payPalWalletContextShippingPreferenceSchema, } from "./pay-pal-wallet-context-shipping-preference.js";
import { PayeePaymentMethodPreference, payeePaymentMethodPreferenceSchema, } from "./payee-payment-method-preference.js";
const payPalWalletExperienceContextProperties = {
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.defaulted(payPalWalletContextShippingPreferenceSchema, PayPalWalletContextShippingPreference.GetFromFile),
    contactPreference: s.defaulted(payPalWalletContactPreferenceSchema, PayPalWalletContactPreference.NoContactInfo),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    appSwitchContext: s.optional(s.lazy(() => appSwitchContextInternalSchema)),
    landingPage: s.defaulted(payPalExperienceLandingPageSchema, PayPalExperienceLandingPage.NoPreference),
    userAction: s.defaulted(payPalExperienceUserActionSchema, PayPalExperienceUserAction.Continue),
    paymentMethodPreference: s.defaulted(payeePaymentMethodPreferenceSchema, PayeePaymentMethodPreference.Unrestricted),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationInternalSchema)),
    _keysMap: {
        brandName: "brand_name",
        shippingPreference: "shipping_preference",
        contactPreference: "contact_preference",
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
        appSwitchContext: "app_switch_context",
        landingPage: "landing_page",
        userAction: "user_action",
        paymentMethodPreference: "payment_method_preference",
        orderUpdateCallbackConfig: "order_update_callback_config",
    },
};
export const payPalWalletExperienceContextInternalSchema = s.object(payPalWalletExperienceContextProperties, {
    additionalProperties: s.json(),
});
export const payPalWalletExperienceContextSchema = s.lazySchema(() => s.object({
    ...payPalWalletExperienceContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.optional(s.string().check(s.url())),
    cancelUrl: s.optional(s.string().check(s.url())),
    appSwitchContext: s.optional(s.lazy(() => appSwitchContextSchema)),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationSchema)),
}, { additionalProperties: s.json() }));
