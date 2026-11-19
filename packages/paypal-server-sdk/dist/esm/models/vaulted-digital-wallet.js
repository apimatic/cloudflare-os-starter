import * as s from "../core/validation/index.js";
import { customerTypeSchema } from "./customer-type.js";
import { usagePatternPaymentMethodTokensSchema, } from "./usage-pattern-payment-method-tokens.js";
import { usageTypeSchema } from "./usage-type.js";
import { vaultedDigitalWalletShippingDetailsInternalSchema, vaultedDigitalWalletShippingDetailsSchema, } from "./vaulted-digital-wallet-shipping-details.js";
const vaultedDigitalWalletProperties = {
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternPaymentMethodTokensSchema)),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsInternalSchema)),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    usageType: s.optional(s.lazy(() => usageTypeSchema)),
    customerType: s.optional(s.lazy(() => customerTypeSchema)),
    _keysMap: {
        usagePattern: "usage_pattern",
        permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
        usageType: "usage_type",
        customerType: "customer_type",
    },
};
export const vaultedDigitalWalletInternalSchema = s.object(vaultedDigitalWalletProperties, { additionalProperties: s.json() });
export const vaultedDigitalWalletSchema = s.lazySchema(() => s.object({
    ...vaultedDigitalWalletProperties,
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=vaulted-digital-wallet.js.map