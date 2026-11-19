import * as s from "../core/validation/index.js";
import { blikExperienceContextInternalSchema, blikExperienceContextSchema, } from "./blik-experience-context.js";
import { blikLevel0PaymentObjectInternalSchema, blikLevel0PaymentObjectSchema, } from "./blik-level0-payment-object.js";
import { blikOneClickPaymentRequestInternalSchema, blikOneClickPaymentRequestSchema, } from "./blik-one-click-payment-request.js";
const blikPaymentRequestProperties = {
    name: s.string(),
    countryCode: s.string(),
    email: s.optional(s.string()),
    experienceContext: s.optional(s.lazy(() => blikExperienceContextInternalSchema)),
    level0: s.optional(s.lazy(() => blikLevel0PaymentObjectInternalSchema)),
    oneClick: s.optional(s.lazy(() => blikOneClickPaymentRequestInternalSchema)),
    _keysMap: {
        countryCode: "country_code",
        experienceContext: "experience_context",
        level0: "level_0",
        oneClick: "one_click",
    },
};
export const blikPaymentRequestInternalSchema = s.object(blikPaymentRequestProperties, { additionalProperties: s.json() });
export const blikPaymentRequestSchema = s.lazySchema(() => s.object({
    ...blikPaymentRequestProperties,
    name: s.string().check(s.minLength(3), s.maxLength(300)),
    countryCode: s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$")),
    email: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    experienceContext: s.optional(s.lazy(() => blikExperienceContextSchema)),
    level0: s.optional(s.lazy(() => blikLevel0PaymentObjectSchema)),
    oneClick: s.optional(s.lazy(() => blikOneClickPaymentRequestSchema)),
}, { additionalProperties: s.json() }));
