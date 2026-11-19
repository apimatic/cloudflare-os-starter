import * as s from "../core/validation/index.js";
import { callbackConfigurationInternalSchema, callbackConfigurationSchema, } from "./callback-configuration.js";
import { VenmoWalletExperienceContextShippingPreference, venmoWalletExperienceContextShippingPreferenceSchema, } from "./venmo-wallet-experience-context-shipping-preference.js";
import { VenmoWalletExperienceContextUserAction, venmoWalletExperienceContextUserActionSchema, } from "./venmo-wallet-experience-context-user-action.js";
const venmoWalletExperienceContextProperties = {
    brandName: s.optional(s.string()),
    shippingPreference: s.defaulted(venmoWalletExperienceContextShippingPreferenceSchema, VenmoWalletExperienceContextShippingPreference.GetFromFile),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationInternalSchema)),
    userAction: s.defaulted(venmoWalletExperienceContextUserActionSchema, VenmoWalletExperienceContextUserAction.Continue),
    _keysMap: {
        brandName: "brand_name",
        shippingPreference: "shipping_preference",
        orderUpdateCallbackConfig: "order_update_callback_config",
        userAction: "user_action",
    },
};
export const venmoWalletExperienceContextInternalSchema = s.object(venmoWalletExperienceContextProperties, {
    additionalProperties: s.json(),
});
export const venmoWalletExperienceContextSchema = s.lazySchema(() => s.object({
    ...venmoWalletExperienceContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=venmo-wallet-experience-context.js.map