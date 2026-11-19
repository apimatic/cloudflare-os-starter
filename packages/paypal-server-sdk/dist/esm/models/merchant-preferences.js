import * as s from "../core/validation/index.js";
const merchantPreferencesProperties = {
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    _keysMap: {
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const merchantPreferencesInternalSchema = s.object(merchantPreferencesProperties, { additionalProperties: s.json() });
export const merchantPreferencesSchema = s.lazySchema(() => s.object({
    ...merchantPreferencesProperties,
    returnUrl: s.optional(s.string().check(s.minLength(10), s.maxLength(4000), s.url())),
    cancelUrl: s.optional(s.string().check(s.minLength(10), s.maxLength(4000), s.url())),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=merchant-preferences.js.map