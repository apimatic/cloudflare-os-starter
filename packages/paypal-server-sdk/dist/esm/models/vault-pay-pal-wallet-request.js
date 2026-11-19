import * as s from "../core/validation/index.js";
import { customerTypeSchema } from "./customer-type.js";
import { planInternalSchema, planSchema } from "./plan.js";
import { usagePatternPaymentMethodTokensSchema, } from "./usage-pattern-payment-method-tokens.js";
import { usageTypeSchema } from "./usage-type.js";
import { vaultExperienceContextInternalSchema, vaultExperienceContextSchema, } from "./vault-experience-context.js";
import { vaultedDigitalWalletShippingDetailsInternalSchema, vaultedDigitalWalletShippingDetailsSchema, } from "./vaulted-digital-wallet-shipping-details.js";
const vaultPayPalWalletRequestProperties = {
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternPaymentMethodTokensSchema)),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsInternalSchema)),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    usageType: s.optional(s.lazy(() => usageTypeSchema)),
    customerType: s.optional(s.lazy(() => customerTypeSchema)),
    billingPlan: s.optional(s.lazy(() => planInternalSchema)),
    experienceContext: s.optional(s.lazy(() => vaultExperienceContextInternalSchema)),
    _keysMap: {
        usagePattern: "usage_pattern",
        permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
        usageType: "usage_type",
        customerType: "customer_type",
        billingPlan: "billing_plan",
        experienceContext: "experience_context",
    },
};
export const vaultPayPalWalletRequestInternalSchema = s.object(vaultPayPalWalletRequestProperties, { additionalProperties: s.json() });
export const vaultPayPalWalletRequestSchema = s.lazySchema(() => s.object({
    ...vaultPayPalWalletRequestProperties,
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
    billingPlan: s.optional(s.lazy(() => planSchema)),
    experienceContext: s.optional(s.lazy(() => vaultExperienceContextSchema)),
}, { additionalProperties: s.json() }));
