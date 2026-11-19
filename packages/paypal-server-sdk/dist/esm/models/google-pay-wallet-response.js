import * as s from "../core/validation/index.js";
import { googlePayCardResponseInternalSchema, googlePayCardResponseSchema, } from "./google-pay-card-response.js";
import { phoneNumberWithCountryCodeInternalSchema, phoneNumberWithCountryCodeSchema, } from "./phone-number-with-country-code.js";
const googlePayWalletResponseProperties = {
    name: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeInternalSchema)),
    card: s.optional(s.lazy(() => googlePayCardResponseInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        phoneNumber: "phone_number",
    },
};
export const googlePayWalletResponseInternalSchema = s.object(googlePayWalletResponseProperties, { additionalProperties: s.json() });
export const googlePayWalletResponseSchema = s.lazySchema(() => s.object({
    ...googlePayWalletResponseProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    card: s.optional(s.lazy(() => googlePayCardResponseSchema)),
}, { additionalProperties: s.json() }));
