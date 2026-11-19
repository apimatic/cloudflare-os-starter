import * as s from "../core/validation/index.js";
import { applePayAttributesResponseInternalSchema, applePayAttributesResponseSchema, } from "./apple-pay-attributes-response.js";
import { applePayCardResponseInternalSchema, applePayCardResponseSchema, } from "./apple-pay-card-response.js";
import { cardStoredCredentialInternalSchema, cardStoredCredentialSchema, } from "./card-stored-credential.js";
import { phoneNumberInternalSchema, phoneNumberSchema } from "./phone-number.js";
const applePayPaymentObjectProperties = {
    id: s.optional(s.string()),
    token: s.optional(s.string()),
    name: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberInternalSchema)),
    card: s.optional(s.lazy(() => applePayCardResponseInternalSchema)),
    attributes: s.optional(s.lazy(() => applePayAttributesResponseInternalSchema)),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        phoneNumber: "phone_number",
        storedCredential: "stored_credential",
    },
};
export const applePayPaymentObjectInternalSchema = s.object(applePayPaymentObjectProperties, { additionalProperties: s.json() });
export const applePayPaymentObjectSchema = s.lazySchema(() => s.object({
    ...applePayPaymentObjectProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(250), s.pattern("^.*$"))),
    token: s.optional(s.string().check(s.minLength(1), s.maxLength(10000), s.pattern("^.*$"))),
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
    card: s.optional(s.lazy(() => applePayCardResponseSchema)),
    attributes: s.optional(s.lazy(() => applePayAttributesResponseSchema)),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
}, { additionalProperties: s.json() }));
