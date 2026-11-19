import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { experienceStatusSchema } from "./experience-status.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { payPalWalletAccountVerificationStatusSchema, } from "./pay-pal-wallet-account-verification-status.js";
import { payPalWalletAttributesResponseInternalSchema, payPalWalletAttributesResponseSchema, } from "./pay-pal-wallet-attributes-response.js";
import { payPalWalletStoredCredentialSchema, } from "./pay-pal-wallet-stored-credential.js";
import { phoneNumberInternalSchema, phoneNumberSchema } from "./phone-number.js";
import { phoneTypeSchema } from "./phone-type.js";
import { taxInfoInternalSchema, taxInfoSchema } from "./tax-info.js";
const payPalWalletResponseProperties = {
    emailAddress: s.optional(s.string()),
    accountId: s.optional(s.string()),
    accountStatus: s.optional(s.lazy(() => payPalWalletAccountVerificationStatusSchema)),
    name: s.optional(s.lazy(() => nameInternalSchema)),
    phoneType: s.optional(s.lazy(() => phoneTypeSchema)),
    phoneNumber: s.optional(s.lazy(() => phoneNumberInternalSchema)),
    birthDate: s.optional(s.string()),
    businessName: s.optional(s.string()),
    taxInfo: s.optional(s.lazy(() => taxInfoInternalSchema)),
    address: s.optional(s.lazy(() => addressInternalSchema)),
    attributes: s.optional(s.lazy(() => payPalWalletAttributesResponseInternalSchema)),
    storedCredential: s.optional(s.lazy(() => payPalWalletStoredCredentialSchema)),
    experienceStatus: s.optional(s.lazy(() => experienceStatusSchema)),
    _keysMap: {
        emailAddress: "email_address",
        accountId: "account_id",
        accountStatus: "account_status",
        phoneType: "phone_type",
        phoneNumber: "phone_number",
        birthDate: "birth_date",
        businessName: "business_name",
        taxInfo: "tax_info",
        storedCredential: "stored_credential",
        experienceStatus: "experience_status",
    },
};
export const payPalWalletResponseInternalSchema = s.object(payPalWalletResponseProperties, { additionalProperties: s.json() });
export const payPalWalletResponseSchema = s.lazySchema(() => s.object({
    ...payPalWalletResponseProperties,
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    accountId: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("^[2-9A-HJ-NP-Z]{13}$"))),
    name: s.optional(s.lazy(() => nameSchema)),
    phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
    birthDate: s.optional(s
        .string()
        .check(s.minLength(10), s.maxLength(10), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"))),
    businessName: s.optional(s.string().check(s.minLength(0), s.maxLength(300), s.pattern("^.*$"))),
    taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
    address: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => payPalWalletAttributesResponseSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=pay-pal-wallet-response.js.map