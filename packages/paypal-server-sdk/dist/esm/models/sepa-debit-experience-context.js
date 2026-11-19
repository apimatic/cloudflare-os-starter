import * as s from "../core/validation/index.js";
const sepaDebitExperienceContextProperties = {
    locale: s.optional(s.string()),
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
    },
};
export const sepaDebitExperienceContextInternalSchema = s.object(sepaDebitExperienceContextProperties, {
    additionalProperties: s.json(),
});
export const sepaDebitExperienceContextSchema = s.lazySchema(() => s.object({
    ...sepaDebitExperienceContextProperties,
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.string().check(s.url()),
    cancelUrl: s.string().check(s.url()),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=sepa-debit-experience-context.js.map