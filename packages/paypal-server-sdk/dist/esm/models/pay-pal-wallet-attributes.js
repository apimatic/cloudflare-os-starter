import * as s from "../core/validation/index.js";
import { payPalWalletCustomerRequestInternalSchema, payPalWalletCustomerRequestSchema, } from "./pay-pal-wallet-customer-request.js";
import { payPalWalletVaultInstructionInternalSchema, payPalWalletVaultInstructionSchema, } from "./pay-pal-wallet-vault-instruction.js";
const payPalWalletAttributesProperties = {
    customer: s.optional(s.lazy(() => payPalWalletCustomerRequestInternalSchema)),
    vault: s.optional(s.lazy(() => payPalWalletVaultInstructionInternalSchema)),
};
export const payPalWalletAttributesInternalSchema = s.object(payPalWalletAttributesProperties, { additionalProperties: s.json() });
export const payPalWalletAttributesSchema = s.lazySchema(() => s.object({
    ...payPalWalletAttributesProperties,
    customer: s.optional(s.lazy(() => payPalWalletCustomerRequestSchema)),
    vault: s.optional(s.lazy(() => payPalWalletVaultInstructionSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=pay-pal-wallet-attributes.js.map