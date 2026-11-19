import * as s from "../core/validation/index.js";
const sofortPaymentObjectProperties = {
    name: s.optional(s.string()),
    countryCode: s.optional(s.string()),
    bic: s.optional(s.string()),
    ibanLastChars: s.optional(s.string()),
    _keysMap: {
        countryCode: "country_code",
        ibanLastChars: "iban_last_chars",
    },
};
export const sofortPaymentObjectInternalSchema = s.object(sofortPaymentObjectProperties, { additionalProperties: s.json() });
export const sofortPaymentObjectSchema = s.lazySchema(() => s.object({
    ...sofortPaymentObjectProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    countryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    bic: s.optional(s
        .string()
        .check(s.minLength(8), s.maxLength(11), s.pattern("^[A-Z-a-z0-9]{4}[A-Z-a-z]{2}[A-Z-a-z0-9]{2}([A-Z-a-z0-9]{3})?$"))),
    ibanLastChars: s.optional(s.string().check(s.minLength(4), s.maxLength(34), s.pattern("[a-zA-Z0-9]{4}"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=sofort-payment-object.js.map