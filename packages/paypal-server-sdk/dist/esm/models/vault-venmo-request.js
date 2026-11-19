import * as s from "../core/validation/index.js";
import { customerTypeSchema } from "./customer-type.js";
import { usagePatternPaymentMethodTokensSchema, } from "./usage-pattern-payment-method-tokens.js";
import { usageTypeSchema } from "./usage-type.js";
import { vaultedDigitalWalletShippingDetailsInternalSchema, vaultedDigitalWalletShippingDetailsSchema, } from "./vaulted-digital-wallet-shipping-details.js";
import { venmoExperienceContextInternalSchema, venmoExperienceContextSchema, } from "./venmo-experience-context.js";
const vaultVenmoRequestProperties = {
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternPaymentMethodTokensSchema)),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsInternalSchema)),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    usageType: s.optional(s.lazy(() => usageTypeSchema)),
    customerType: s.optional(s.lazy(() => customerTypeSchema)),
    experienceContext: s.optional(s.lazy(() => venmoExperienceContextInternalSchema)),
    _keysMap: {
        usagePattern: "usage_pattern",
        permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
        usageType: "usage_type",
        customerType: "customer_type",
        experienceContext: "experience_context",
    },
};
export const vaultVenmoRequestInternalSchema = s.object(vaultVenmoRequestProperties, { additionalProperties: s.json() });
export const vaultVenmoRequestSchema = s.lazySchema(() => s.object({
    ...vaultVenmoRequestProperties,
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
    experienceContext: s.optional(s.lazy(() => venmoExperienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=vault-venmo-request.js.map