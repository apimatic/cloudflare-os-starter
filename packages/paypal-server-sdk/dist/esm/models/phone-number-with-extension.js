import * as s from "../core/validation/index.js";
const phoneNumberWithExtensionProperties = {
    countryCode: s.string(),
    nationalNumber: s.string(),
    extensionNumber: s.optional(s.string()),
    _keysMap: {
        countryCode: "country_code",
        nationalNumber: "national_number",
        extensionNumber: "extension_number",
    },
};
export const phoneNumberWithExtensionInternalSchema = s.object(phoneNumberWithExtensionProperties, { additionalProperties: s.json() });
export const phoneNumberWithExtensionSchema = s.lazySchema(() => s.object({
    ...phoneNumberWithExtensionProperties,
    countryCode: s.string().check(s.minLength(1), s.maxLength(3), s.pattern("^[0-9]{1,3}?$")),
    nationalNumber: s.string().check(s.minLength(1), s.maxLength(14), s.pattern("^[0-9]{1,14}?$")),
    extensionNumber: s.optional(s.string().check(s.minLength(1), s.maxLength(15), s.pattern("^[0-9]{1,15}?$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=phone-number-with-extension.js.map