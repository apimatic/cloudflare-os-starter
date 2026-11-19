import * as s from "../core/validation/index.js";
const googlePayExperienceContextProperties = {
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const googlePayExperienceContextInternalSchema = s.object(googlePayExperienceContextProperties, {
    additionalProperties: s.json(),
});
export const googlePayExperienceContextSchema = s.lazySchema(() => s.object({
    ...googlePayExperienceContextProperties,
    returnUrl: s.string().check(s.url()),
    cancelUrl: s.string().check(s.url()),
}, { additionalProperties: s.json() }));
