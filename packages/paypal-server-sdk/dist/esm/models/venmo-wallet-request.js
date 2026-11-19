import * as s from "../core/validation/index.js";
import { venmoWalletAdditionalAttributesInternalSchema, venmoWalletAdditionalAttributesSchema, } from "./venmo-wallet-additional-attributes.js";
import { venmoWalletExperienceContextInternalSchema, venmoWalletExperienceContextSchema, } from "./venmo-wallet-experience-context.js";
const venmoWalletRequestProperties = {
    vaultId: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    experienceContext: s.optional(s.lazy(() => venmoWalletExperienceContextInternalSchema)),
    attributes: s.optional(s.lazy(() => venmoWalletAdditionalAttributesInternalSchema)),
    _keysMap: {
        vaultId: "vault_id",
        emailAddress: "email_address",
        experienceContext: "experience_context",
    },
};
export const venmoWalletRequestInternalSchema = s.object(venmoWalletRequestProperties, { additionalProperties: s.json() });
export const venmoWalletRequestSchema = s.lazySchema(() => s.object({
    ...venmoWalletRequestProperties,
    vaultId: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    experienceContext: s.optional(s.lazy(() => venmoWalletExperienceContextSchema)),
    attributes: s.optional(s.lazy(() => venmoWalletAdditionalAttributesSchema)),
}, { additionalProperties: s.json() }));
