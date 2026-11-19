import * as s from "../core/validation/index.js";
import { tenureType1Schema } from "./tenure-type1.js";
const cycleExecutionProperties = {
    tenureType: tenureType1Schema,
    sequence: s.int(),
    cyclesCompleted: s.int(),
    cyclesRemaining: s.optional(s.int()),
    currentPricingSchemeVersion: s.optional(s.int()),
    totalCycles: s.optional(s.int()),
    _keysMap: {
        tenureType: "tenure_type",
        cyclesCompleted: "cycles_completed",
        cyclesRemaining: "cycles_remaining",
        currentPricingSchemeVersion: "current_pricing_scheme_version",
        totalCycles: "total_cycles",
    },
};
export const cycleExecutionInternalSchema = s.object(cycleExecutionProperties, { additionalProperties: s.json() });
export const cycleExecutionSchema = s.lazySchema(() => s.object({
    ...cycleExecutionProperties,
    sequence: s.int().check(s.gte(0), s.lte(99)),
    cyclesCompleted: s.int().check(s.gte(0), s.lte(9999)),
    cyclesRemaining: s.optional(s.int().check(s.gte(0), s.lte(9999))),
    currentPricingSchemeVersion: s.optional(s.int().check(s.gte(1), s.lte(99))),
    totalCycles: s.optional(s.int().check(s.gte(0), s.lte(999))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=cycle-execution.js.map