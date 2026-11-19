import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { payPalWalletCustomerInternalSchema, payPalWalletCustomerSchema, } from "./pay-pal-wallet-customer.js";
import { payPalWalletVaultStatusSchema, } from "./pay-pal-wallet-vault-status.js";
const payPalWalletVaultResponseProperties = {
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => payPalWalletVaultStatusSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    customer: s.optional(s.lazy(() => payPalWalletCustomerInternalSchema)),
};
export const payPalWalletVaultResponseInternalSchema = s.object(payPalWalletVaultResponseProperties, {
    additionalProperties: s.json(),
});
export const payPalWalletVaultResponseSchema = s.lazySchema(() => s.object({
    ...payPalWalletVaultResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(255))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
    customer: s.optional(s.lazy(() => payPalWalletCustomerSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=pay-pal-wallet-vault-response.js.map