import * as s from "../core/validation/index.js";
const cardResponseAddressProperties = {
    addressLine1: s.optional(s.string()),
    addressLine2: s.optional(s.string()),
    adminArea2: s.optional(s.string()),
    adminArea1: s.optional(s.string()),
    postalCode: s.optional(s.string()),
    countryCode: s.string(),
    id: s.optional(s.string()),
    _keysMap: {
        addressLine1: "address_line_1",
        addressLine2: "address_line_2",
        adminArea2: "admin_area_2",
        adminArea1: "admin_area_1",
        postalCode: "postal_code",
        countryCode: "country_code",
    },
};
export const cardResponseAddressInternalSchema = s.object(cardResponseAddressProperties, { additionalProperties: s.json() });
export const cardResponseAddressSchema = s.lazySchema(() => s.object({
    ...cardResponseAddressProperties,
    addressLine1: s.optional(s.string().check(s.maxLength(300))),
    addressLine2: s.optional(s.string().check(s.maxLength(300))),
    adminArea2: s.optional(s.string().check(s.maxLength(120))),
    adminArea1: s.optional(s.string().check(s.maxLength(300))),
    postalCode: s.optional(s.string().check(s.maxLength(60))),
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[0-9A-Za-z-_]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-response-address.js.map