import * as s from "../core/validation/index.js";
import { applePayAttributesInternalSchema, applePayAttributesSchema, } from "./apple-pay-attributes.js";
import { applePayDecryptedTokenDataInternalSchema, applePayDecryptedTokenDataSchema, } from "./apple-pay-decrypted-token-data.js";
import { applePayExperienceContextInternalSchema, applePayExperienceContextSchema, } from "./apple-pay-experience-context.js";
import { cardStoredCredentialInternalSchema, cardStoredCredentialSchema, } from "./card-stored-credential.js";
import { phoneNumberInternalSchema, phoneNumberSchema } from "./phone-number.js";
const applePayRequestProperties = {
    id: s.optional(s.string()),
    name: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberInternalSchema)),
    decryptedToken: s.optional(s.lazy(() => applePayDecryptedTokenDataInternalSchema)),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialInternalSchema)),
    vaultId: s.optional(s.string()),
    attributes: s.optional(s.lazy(() => applePayAttributesInternalSchema)),
    experienceContext: s.optional(s.lazy(() => applePayExperienceContextInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        phoneNumber: "phone_number",
        decryptedToken: "decrypted_token",
        storedCredential: "stored_credential",
        vaultId: "vault_id",
        experienceContext: "experience_context",
    },
};
export const applePayRequestInternalSchema = s.object(applePayRequestProperties, { additionalProperties: s.json() });
export const applePayRequestSchema = s.lazySchema(() => s.object({
    ...applePayRequestProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(250), s.pattern("^.*$"))),
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
    decryptedToken: s.optional(s.lazy(() => applePayDecryptedTokenDataSchema)),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
    vaultId: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    attributes: s.optional(s.lazy(() => applePayAttributesSchema)),
    experienceContext: s.optional(s.lazy(() => applePayExperienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=apple-pay-request.js.map