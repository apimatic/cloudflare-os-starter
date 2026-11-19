import * as s from "../core/validation/index.js";
import { storeInVaultInstructionSchema } from "./store-in-vault-instruction.js";
import { VenmoPaymentTokenCustomerType, venmoPaymentTokenCustomerTypeSchema, } from "./venmo-payment-token-customer-type.js";
import { venmoPaymentTokenUsagePatternSchema, } from "./venmo-payment-token-usage-pattern.js";
import { venmoPaymentTokenUsageTypeSchema, } from "./venmo-payment-token-usage-type.js";
const venmoWalletVaultAttributesProperties = {
    storeInVault: storeInVaultInstructionSchema,
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => venmoPaymentTokenUsagePatternSchema)),
    usageType: venmoPaymentTokenUsageTypeSchema,
    customerType: s.defaulted(venmoPaymentTokenCustomerTypeSchema, VenmoPaymentTokenCustomerType.Consumer),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    _keysMap: {
        storeInVault: "store_in_vault",
        usagePattern: "usage_pattern",
        usageType: "usage_type",
        customerType: "customer_type",
        permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    },
};
export const venmoWalletVaultAttributesInternalSchema = s.object(venmoWalletVaultAttributesProperties, {
    additionalProperties: s.json(),
});
export const venmoWalletVaultAttributesSchema = s.lazySchema(() => s.object({
    ...venmoWalletVaultAttributesProperties,
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^[a-zA-Z0-9_'\\-., :;\\!?\"]*$"))),
}, { additionalProperties: s.json() }));
