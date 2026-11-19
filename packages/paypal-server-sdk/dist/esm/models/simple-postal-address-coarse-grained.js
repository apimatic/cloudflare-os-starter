import * as s from "../core/validation/index.js";
const simplePostalAddressCoarseGrainedProperties = {
    line1: s.string(),
    line2: s.optional(s.string()),
    city: s.string(),
    state: s.optional(s.string()),
    countryCode: s.string(),
    postalCode: s.optional(s.string()),
    _keysMap: {
        countryCode: "country_code",
        postalCode: "postal_code",
    },
};
export const simplePostalAddressCoarseGrainedInternalSchema = s.object(simplePostalAddressCoarseGrainedProperties, {
    additionalProperties: s.json(),
});
export const simplePostalAddressCoarseGrainedSchema = s.lazySchema(() => s.object({
    ...simplePostalAddressCoarseGrainedProperties,
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
}, { additionalProperties: s.json() }));
