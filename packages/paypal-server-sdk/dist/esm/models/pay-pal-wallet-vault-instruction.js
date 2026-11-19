import * as s from "../core/validation/index.js";
import { PayPalPaymentTokenCustomerType, payPalPaymentTokenCustomerTypeSchema, } from "./pay-pal-payment-token-customer-type.js";
import { payPalPaymentTokenUsageTypeSchema, } from "./pay-pal-payment-token-usage-type.js";
import { usagePatternSchema } from "./usage-pattern.js";
const payPalWalletVaultInstructionProperties = {
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usageType: payPalPaymentTokenUsageTypeSchema,
    customerType: s.defaulted(payPalPaymentTokenCustomerTypeSchema, PayPalPaymentTokenCustomerType.Consumer),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    _keysMap: {
        usagePattern: "usage_pattern",
        usageType: "usage_type",
        customerType: "customer_type",
        permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    },
};
export const payPalWalletVaultInstructionInternalSchema = s.object(payPalWalletVaultInstructionProperties, {
    additionalProperties: s.json(),
});
export const payPalWalletVaultInstructionSchema = s.lazySchema(() => s.object({
    ...payPalWalletVaultInstructionProperties,
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(128))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=pay-pal-wallet-vault-instruction.js.map