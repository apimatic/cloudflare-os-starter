import * as s from "../core/validation/index.js";
import { ExperienceContextShippingPreference, experienceContextShippingPreferenceSchema, } from "./experience-context-shipping-preference.js";
const experienceContextProperties = {
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.defaulted(experienceContextShippingPreferenceSchema, ExperienceContextShippingPreference.GetFromFile),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    _keysMap: {
        brandName: "brand_name",
        shippingPreference: "shipping_preference",
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const experienceContextInternalSchema = s.object(experienceContextProperties, { additionalProperties: s.json() });
export const experienceContextSchema = s.lazySchema(() => s.object({
    ...experienceContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.optional(s.string().check(s.url())),
    cancelUrl: s.optional(s.string().check(s.url())),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=experience-context.js.map