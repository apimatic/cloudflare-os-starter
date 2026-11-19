import * as s from "../core/validation/index.js";
const binDetailsProperties = {
    bin: s.optional(s.string()),
    issuingBank: s.optional(s.string()),
    binCountryCode: s.optional(s.string()),
    products: s.optional(s.array(s.string())),
    _keysMap: {
        issuingBank: "issuing_bank",
        binCountryCode: "bin_country_code",
    },
};
export const binDetailsInternalSchema = s.object(binDetailsProperties, {
    additionalProperties: s.json(),
});
export const binDetailsSchema = s.lazySchema(() => s.object({
    ...binDetailsProperties,
    bin: s.optional(s.string().check(s.minLength(1), s.maxLength(25), s.pattern("^[0-9]+$"))),
    issuingBank: s.optional(s.string().check(s.minLength(1), s.maxLength(64))),
    binCountryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    products: s.optional(s.array(s.string().check(s.minLength(1), s.maxLength(255))).check(s.minLength(1), s.maxLength(256))),
}, { additionalProperties: s.json() }));
