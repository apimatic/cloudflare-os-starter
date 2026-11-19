import * as s from "../core/validation/index.js";
const p24PaymentObjectProperties = {
    name: s.optional(s.string()),
    email: s.optional(s.string()),
    countryCode: s.optional(s.string()),
    paymentDescriptor: s.optional(s.string()),
    methodId: s.optional(s.string()),
    methodDescription: s.optional(s.string()),
    _keysMap: {
        countryCode: "country_code",
        paymentDescriptor: "payment_descriptor",
        methodId: "method_id",
        methodDescription: "method_description",
    },
};
export const p24PaymentObjectInternalSchema = s.object(p24PaymentObjectProperties, { additionalProperties: s.json() });
export const p24PaymentObjectSchema = s.lazySchema(() => s.object({
    ...p24PaymentObjectProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    email: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    countryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    paymentDescriptor: s.optional(s.string().check(s.minLength(1), s.maxLength(2000))),
    methodId: s.optional(s.string().check(s.minLength(1), s.maxLength(300))),
    methodDescription: s.optional(s.string().check(s.minLength(1), s.maxLength(2000))),
}, { additionalProperties: s.json() }));
