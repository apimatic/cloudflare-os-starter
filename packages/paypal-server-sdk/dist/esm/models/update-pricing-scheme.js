import * as s from "../core/validation/index.js";
import { subscriptionPricingSchemeInternalSchema, subscriptionPricingSchemeSchema, } from "./subscription-pricing-scheme.js";
const updatePricingSchemeProperties = {
    billingCycleSequence: s.int(),
    pricingScheme: subscriptionPricingSchemeInternalSchema,
    _keysMap: {
        billingCycleSequence: "billing_cycle_sequence",
        pricingScheme: "pricing_scheme",
    },
};
export const updatePricingSchemeInternalSchema = s.object(updatePricingSchemeProperties, { additionalProperties: s.json() });
export const updatePricingSchemeSchema = s.lazySchema(() => s.object({
    ...updatePricingSchemeProperties,
    billingCycleSequence: s.int().check(s.gte(1), s.lte(99)),
    pricingScheme: subscriptionPricingSchemeSchema,
}, { additionalProperties: s.json() }));
