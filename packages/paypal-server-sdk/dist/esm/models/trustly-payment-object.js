import * as s from "../core/validation/index.js";
const trustlyPaymentObjectProperties = {
    name: s.optional(s.string()),
    countryCode: s.optional(s.string()),
    email: s.optional(s.string()),
    bic: s.optional(s.string()),
    ibanLastChars: s.optional(s.string()),
    _keysMap: {
        countryCode: "country_code",
        ibanLastChars: "iban_last_chars",
    },
};
export const trustlyPaymentObjectInternalSchema = s.object(trustlyPaymentObjectProperties, { additionalProperties: s.json() });
export const trustlyPaymentObjectSchema = s.lazySchema(() => s.object({
    ...trustlyPaymentObjectProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    countryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    email: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    bic: s.optional(s
        .string()
        .check(s.minLength(8), s.maxLength(11), s.pattern("^[A-Z-a-z0-9]{4}[A-Z-a-z]{2}[A-Z-a-z0-9]{2}([A-Z-a-z0-9]{3})?$"))),
    ibanLastChars: s.optional(s.string().check(s.minLength(4), s.maxLength(34), s.pattern("[a-zA-Z0-9]{4}"))),
}, { additionalProperties: s.json() }));
