import * as s from "../core/validation/index.js";
import { subscriptionPricingSchemeInternalSchema, subscriptionPricingSchemeSchema, } from "./subscription-pricing-scheme.js";
const billingCycleOverrideProperties = {
    pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeInternalSchema)),
    sequence: s.int(),
    totalCycles: s.optional(s.int()),
    _keysMap: {
        pricingScheme: "pricing_scheme",
        totalCycles: "total_cycles",
    },
};
export const billingCycleOverrideInternalSchema = s.object(billingCycleOverrideProperties, { additionalProperties: s.json() });
export const billingCycleOverrideSchema = s.lazySchema(() => s.object({
    ...billingCycleOverrideProperties,
    pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeSchema)),
    sequence: s.int().check(s.gte(1), s.lte(99)),
    totalCycles: s.optional(s.int().check(s.gte(0), s.lte(999))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=billing-cycle-override.js.map