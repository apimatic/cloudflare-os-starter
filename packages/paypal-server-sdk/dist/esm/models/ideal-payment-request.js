import * as s from "../core/validation/index.js";
import { experienceContextInternalSchema, experienceContextSchema, } from "./experience-context.js";
const iDealPaymentRequestProperties = {
    name: s.string(),
    countryCode: s.string(),
    bic: s.optional(s.string()),
    experienceContext: s.optional(s.lazy(() => experienceContextInternalSchema)),
    _keysMap: {
        countryCode: "country_code",
        experienceContext: "experience_context",
    },
};
export const iDealPaymentRequestInternalSchema = s.object(iDealPaymentRequestProperties, { additionalProperties: s.json() });
export const iDealPaymentRequestSchema = s.lazySchema(() => s.object({
    ...iDealPaymentRequestProperties,
    name: s.string().check(s.minLength(3), s.maxLength(300)),
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
    bic: s.optional(s
        .string()
        .check(s.minLength(8), s.maxLength(11), s.pattern("^[A-Z-a-z0-9]{4}[A-Z-a-z]{2}[A-Z-a-z0-9]{2}([A-Z-a-z0-9]{3})?$"))),
    experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
}, { additionalProperties: s.json() }));
