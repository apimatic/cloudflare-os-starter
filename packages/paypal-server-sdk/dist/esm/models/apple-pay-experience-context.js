import * as s from "../core/validation/index.js";
const applePayExperienceContextProperties = {
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const applePayExperienceContextInternalSchema = s.object(applePayExperienceContextProperties, {
    additionalProperties: s.json(),
});
export const applePayExperienceContextSchema = s.lazySchema(() => s.object({
    ...applePayExperienceContextProperties,
    returnUrl: s.string().check(s.url()),
    cancelUrl: s.string().check(s.url()),
}, { additionalProperties: s.json() }));
