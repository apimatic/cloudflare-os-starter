import * as s from "../core/validation/index.js";
import { pricingSchemeInternalSchema, pricingSchemeSchema } from "./pricing-scheme.js";
import { tenureTypeSchema } from "./tenure-type.js";
const billingCycleProperties = {
    tenureType: tenureTypeSchema,
    pricingScheme: s.optional(s.lazy(() => pricingSchemeInternalSchema)),
    totalCycles: s.defaulted(s.int(), 1),
    sequence: s.defaulted(s.int(), 1),
    startDate: s.optional(s.string()),
    _keysMap: {
        tenureType: "tenure_type",
        pricingScheme: "pricing_scheme",
        totalCycles: "total_cycles",
        startDate: "start_date",
    },
};
export const billingCycleInternalSchema = s.object(billingCycleProperties, { additionalProperties: s.json() });
export const billingCycleSchema = s.lazySchema(() => s.object({
    ...billingCycleProperties,
    pricingScheme: s.optional(s.lazy(() => pricingSchemeSchema)),
    totalCycles: s.defaulted(s.int().check(s.gte(0), s.lte(999)), 1),
    sequence: s.defaulted(s.int().check(s.gte(1), s.lte(3)), 1),
    startDate: s.optional(s
        .string()
        .check(s.minLength(10), s.maxLength(10), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"))),
}, { additionalProperties: s.json() }));
