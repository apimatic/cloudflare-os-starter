import * as s from "../core/validation/index.js";
import { assuranceDetailsSchema } from "./assurance-details.js";
import { googlePayDecryptedTokenDataInternalSchema, googlePayDecryptedTokenDataSchema, } from "./google-pay-decrypted-token-data.js";
import { googlePayExperienceContextInternalSchema, googlePayExperienceContextSchema, } from "./google-pay-experience-context.js";
import { googlePayRequestCardInternalSchema, googlePayRequestCardSchema, } from "./google-pay-request-card.js";
import { phoneNumberWithCountryCodeInternalSchema, phoneNumberWithCountryCodeSchema, } from "./phone-number-with-country-code.js";
const googlePayRequestProperties = {
    name: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeInternalSchema)),
    card: s.optional(s.lazy(() => googlePayRequestCardInternalSchema)),
    decryptedToken: s.optional(s.lazy(() => googlePayDecryptedTokenDataInternalSchema)),
    assuranceDetails: s.optional(s.lazy(() => assuranceDetailsSchema)),
    experienceContext: s.optional(s.lazy(() => googlePayExperienceContextInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        phoneNumber: "phone_number",
        decryptedToken: "decrypted_token",
        assuranceDetails: "assurance_details",
        experienceContext: "experience_context",
    },
};
export const googlePayRequestInternalSchema = s.object(googlePayRequestProperties, { additionalProperties: s.json() });
export const googlePayRequestSchema = s.lazySchema(() => s.object({
    ...googlePayRequestProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    card: s.optional(s.lazy(() => googlePayRequestCardSchema)),
    decryptedToken: s.optional(s.lazy(() => googlePayDecryptedTokenDataSchema)),
    experienceContext: s.optional(s.lazy(() => googlePayExperienceContextSchema)),
}, { additionalProperties: s.json() }));
