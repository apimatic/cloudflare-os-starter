import * as s from "../core/validation/index.js";
import { experienceContextInternalSchema, experienceContextSchema, } from "./experience-context.js";
const p24PaymentRequestProperties = {
    name: s.string(),
    email: s.string(),
    countryCode: s.string(),
    experienceContext: s.optional(s.lazy(() => experienceContextInternalSchema)),
    _keysMap: {
        countryCode: "country_code",
        experienceContext: "experience_context",
    },
};
export const p24PaymentRequestInternalSchema = s.object(p24PaymentRequestProperties, { additionalProperties: s.json() });
export const p24PaymentRequestSchema = s.lazySchema(() => s.object({
    ...p24PaymentRequestProperties,
    name: s.string().check(s.minLength(3), s.maxLength(300)),
    email: s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$")),
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
    experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
}, { additionalProperties: s.json() }));
