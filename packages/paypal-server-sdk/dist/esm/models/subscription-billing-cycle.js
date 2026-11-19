import * as s from "../core/validation/index.js";
import { frequencyInternalSchema, frequencySchema } from "./frequency.js";
import { subscriptionPricingSchemeInternalSchema, subscriptionPricingSchemeSchema, } from "./subscription-pricing-scheme.js";
import { tenureTypeSubscriptionsSchema } from "./tenure-type-subscriptions.js";
const subscriptionBillingCycleProperties = {
    pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeInternalSchema)),
    frequency: frequencyInternalSchema,
    tenureType: tenureTypeSubscriptionsSchema,
    sequence: s.int(),
    totalCycles: s.defaulted(s.int(), 1),
    _keysMap: {
        pricingScheme: "pricing_scheme",
        tenureType: "tenure_type",
        totalCycles: "total_cycles",
    },
};
export const subscriptionBillingCycleInternalSchema = s.object(subscriptionBillingCycleProperties, { additionalProperties: s.json() });
export const subscriptionBillingCycleSchema = s.lazySchema(() => s.object({
    ...subscriptionBillingCycleProperties,
    pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeSchema)),
    frequency: frequencySchema,
    sequence: s.int().check(s.gte(1), s.lte(99)),
    totalCycles: s.defaulted(s.int().check(s.gte(0), s.lte(999)), 1),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-billing-cycle.js.map