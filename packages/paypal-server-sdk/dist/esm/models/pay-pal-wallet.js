import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { payPalWalletAttributesInternalSchema, payPalWalletAttributesSchema, } from "./pay-pal-wallet-attributes.js";
import { payPalWalletExperienceContextInternalSchema, payPalWalletExperienceContextSchema, } from "./pay-pal-wallet-experience-context.js";
import { payPalWalletStoredCredentialSchema, } from "./pay-pal-wallet-stored-credential.js";
import { phoneWithTypeInternalSchema, phoneWithTypeSchema } from "./phone-with-type.js";
import { taxInfoInternalSchema, taxInfoSchema } from "./tax-info.js";
const payPalWalletProperties = {
    vaultId: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    name: s.optional(s.lazy(() => nameInternalSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeInternalSchema)),
    birthDate: s.optional(s.string()),
    taxInfo: s.optional(s.lazy(() => taxInfoInternalSchema)),
    address: s.optional(s.lazy(() => addressInternalSchema)),
    attributes: s.optional(s.lazy(() => payPalWalletAttributesInternalSchema)),
    experienceContext: s.optional(s.lazy(() => payPalWalletExperienceContextInternalSchema)),
    billingAgreementId: s.optional(s.string()),
    storedCredential: s.optional(s.lazy(() => payPalWalletStoredCredentialSchema)),
    _keysMap: {
        vaultId: "vault_id",
        emailAddress: "email_address",
        birthDate: "birth_date",
        taxInfo: "tax_info",
        experienceContext: "experience_context",
        billingAgreementId: "billing_agreement_id",
        storedCredential: "stored_credential",
    },
};
export const payPalWalletInternalSchema = s.object(payPalWalletProperties, { additionalProperties: s.json() });
export const payPalWalletSchema = s.lazySchema(() => s.object({
    ...payPalWalletProperties,
    vaultId: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    name: s.optional(s.lazy(() => nameSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
    birthDate: s.optional(s
        .string()
        .check(s.minLength(10), s.maxLength(10), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"))),
    taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
    address: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => payPalWalletAttributesSchema)),
    experienceContext: s.optional(s.lazy(() => payPalWalletExperienceContextSchema)),
    billingAgreementId: s.optional(s.string().check(s.minLength(2), s.maxLength(128), s.pattern("^[a-zA-Z0-9-]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=pay-pal-wallet.js.map