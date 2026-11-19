import * as s from "../core/validation/index.js";
const giropayPaymentObjectProperties = {
    name: s.optional(s.string()),
    countryCode: s.optional(s.string()),
    bic: s.optional(s.string()),
    _keysMap: {
        countryCode: "country_code",
    },
};
export const giropayPaymentObjectInternalSchema = s.object(giropayPaymentObjectProperties, { additionalProperties: s.json() });
export const giropayPaymentObjectSchema = s.lazySchema(() => s.object({
    ...giropayPaymentObjectProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    countryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    bic: s.optional(s
        .string()
        .check(s.minLength(8), s.maxLength(11), s.pattern("^[A-Z-a-z0-9]{4}[A-Z-a-z]{2}[A-Z-a-z0-9]{2}([A-Z-a-z0-9]{3})?$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=giropay-payment-object.js.map