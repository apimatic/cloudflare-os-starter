import * as s from "../core/validation/index.js";
import { experienceContextInternalSchema, experienceContextSchema, } from "./experience-context.js";
const myBankPaymentRequestProperties = {
    name: s.string(),
    countryCode: s.string(),
    experienceContext: s.optional(s.lazy(() => experienceContextInternalSchema)),
    _keysMap: {
        countryCode: "country_code",
        experienceContext: "experience_context",
    },
};
export const myBankPaymentRequestInternalSchema = s.object(myBankPaymentRequestProperties, { additionalProperties: s.json() });
export const myBankPaymentRequestSchema = s.lazySchema(() => s.object({
    ...myBankPaymentRequestProperties,
    name: s.string().check(s.minLength(3), s.maxLength(300)),
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
    experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=my-bank-payment-request.js.map