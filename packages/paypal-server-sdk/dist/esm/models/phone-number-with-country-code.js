import * as s from "../core/validation/index.js";
const phoneNumberWithCountryCodeProperties = {
    countryCode: s.string(),
    nationalNumber: s.string(),
    _keysMap: {
        countryCode: "country_code",
        nationalNumber: "national_number",
    },
};
export const phoneNumberWithCountryCodeInternalSchema = s.object(phoneNumberWithCountryCodeProperties, {
    additionalProperties: s.json(),
});
export const phoneNumberWithCountryCodeSchema = s.lazySchema(() => s.object({
    ...phoneNumberWithCountryCodeProperties,
    countryCode: s.string().check(s.minLength(1), s.maxLength(3), s.pattern("^[0-9]{1,3}?$")),
    nationalNumber: s.string().check(s.minLength(1), s.maxLength(14), s.pattern("^[0-9]{1,14}?$")),
}, { additionalProperties: s.json() }));
