import * as s from "../core/validation/index.js";
const phoneNumberWithCountryCodeSubscriptionsProperties = {
    countryCode: s.string(),
    nationalNumber: s.string(),
    _keysMap: {
        countryCode: "country_code",
        nationalNumber: "national_number",
    },
};
export const phoneNumberWithCountryCodeSubscriptionsInternalSchema = s.object(phoneNumberWithCountryCodeSubscriptionsProperties, {
    additionalProperties: s.json(),
});
export const phoneNumberWithCountryCodeSubscriptionsSchema = s.lazySchema(() => s.object({
    ...phoneNumberWithCountryCodeSubscriptionsProperties,
    countryCode: s.string().check(s.minLength(1), s.maxLength(3), s.pattern("^[0-9]{1,3}?$")),
    nationalNumber: s.string().check(s.minLength(1), s.maxLength(14), s.pattern("^[0-9]{1,14}?$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=phone-number-with-country-code-subscriptions.js.map