import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardAttributesInternalSchema, cardAttributesSchema, } from "./card-attributes.js";
import { cardExperienceContextInternalSchema, cardExperienceContextSchema, } from "./card-experience-context.js";
import { cardStoredCredentialInternalSchema, cardStoredCredentialSchema, } from "./card-stored-credential.js";
import { networkTokenInternalSchema, networkTokenSchema } from "./network-token.js";
const cardRequestProperties = {
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    attributes: s.optional(s.lazy(() => cardAttributesInternalSchema)),
    vaultId: s.optional(s.string()),
    singleUseToken: s.optional(s.string()),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialInternalSchema)),
    networkToken: s.optional(s.lazy(() => networkTokenInternalSchema)),
    experienceContext: s.optional(s.lazy(() => cardExperienceContextInternalSchema)),
    _keysMap: {
        securityCode: "security_code",
        billingAddress: "billing_address",
        vaultId: "vault_id",
        singleUseToken: "single_use_token",
        storedCredential: "stored_credential",
        networkToken: "network_token",
        experienceContext: "experience_context",
    },
};
export const cardRequestInternalSchema = s.object(cardRequestProperties, {
    additionalProperties: s.json(),
});
export const cardRequestSchema = s.lazySchema(() => s.object({
    ...cardRequestProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    number: s.optional(s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    securityCode: s.optional(s.string().check(s.minLength(3), s.maxLength(4), s.pattern("^[0-9]{3,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => cardAttributesSchema)),
    vaultId: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    singleUseToken: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
    networkToken: s.optional(s.lazy(() => networkTokenSchema)),
    experienceContext: s.optional(s.lazy(() => cardExperienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-request.js.map