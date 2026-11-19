import * as s from "../core/validation/index.js";
import { experienceContextInternalSchema, experienceContextSchema, } from "./experience-context.js";
const bancontactPaymentRequestProperties = {
    name: s.string(),
    countryCode: s.string(),
    experienceContext: s.optional(s.lazy(() => experienceContextInternalSchema)),
    _keysMap: {
        countryCode: "country_code",
        experienceContext: "experience_context",
    },
};
export const bancontactPaymentRequestInternalSchema = s.object(bancontactPaymentRequestProperties, { additionalProperties: s.json() });
export const bancontactPaymentRequestSchema = s.lazySchema(() => s.object({
    ...bancontactPaymentRequestProperties,
    name: s.string().check(s.minLength(3), s.maxLength(300)),
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
    experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=bancontact-payment-request.js.map