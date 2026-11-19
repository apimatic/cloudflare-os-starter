import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
import { vaultCardExperienceContextInternalSchema, vaultCardExperienceContextSchema, } from "./vault-card-experience-context.js";
import { vaultCardVerificationMethodSchema, } from "./vault-card-verification-method.js";
const setupTokenRequestCardProperties = {
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    verificationMethod: s.optional(s.lazy(() => vaultCardVerificationMethodSchema)),
    experienceContext: s.optional(s.lazy(() => vaultCardExperienceContextInternalSchema)),
    _keysMap: {
        securityCode: "security_code",
        billingAddress: "billing_address",
        verificationMethod: "verification_method",
        experienceContext: "experience_context",
    },
};
export const setupTokenRequestCardInternalSchema = s.object(setupTokenRequestCardProperties, { additionalProperties: s.json() });
export const setupTokenRequestCardSchema = s.lazySchema(() => s.object({
    ...setupTokenRequestCardProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    number: s.optional(s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    securityCode: s.optional(s.string().check(s.minLength(3), s.maxLength(4), s.pattern("^[0-9]{3,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    experienceContext: s.optional(s.lazy(() => vaultCardExperienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=setup-token-request-card.js.map