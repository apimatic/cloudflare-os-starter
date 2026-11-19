import * as s from "../core/validation/index.js";
const cardExperienceContextProperties = {
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    _keysMap: {
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const cardExperienceContextInternalSchema = s.object(cardExperienceContextProperties, { additionalProperties: s.json() });
export const cardExperienceContextSchema = s.lazySchema(() => s.object({
    ...cardExperienceContextProperties,
    returnUrl: s.optional(s.string().check(s.url())),
    cancelUrl: s.optional(s.string().check(s.url())),
}, { additionalProperties: s.json() }));
