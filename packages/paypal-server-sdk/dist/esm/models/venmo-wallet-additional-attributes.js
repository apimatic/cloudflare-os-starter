import * as s from "../core/validation/index.js";
import { venmoWalletCustomerInformationInternalSchema, venmoWalletCustomerInformationSchema, } from "./venmo-wallet-customer-information.js";
import { venmoWalletVaultAttributesInternalSchema, venmoWalletVaultAttributesSchema, } from "./venmo-wallet-vault-attributes.js";
const venmoWalletAdditionalAttributesProperties = {
    customer: s.optional(s.lazy(() => venmoWalletCustomerInformationInternalSchema)),
    vault: s.optional(s.lazy(() => venmoWalletVaultAttributesInternalSchema)),
};
export const venmoWalletAdditionalAttributesInternalSchema = s.object(venmoWalletAdditionalAttributesProperties, {
    additionalProperties: s.json(),
});
export const venmoWalletAdditionalAttributesSchema = s.lazySchema(() => s.object({
    ...venmoWalletAdditionalAttributesProperties,
    customer: s.optional(s.lazy(() => venmoWalletCustomerInformationSchema)),
    vault: s.optional(s.lazy(() => venmoWalletVaultAttributesSchema)),
}, { additionalProperties: s.json() }));
