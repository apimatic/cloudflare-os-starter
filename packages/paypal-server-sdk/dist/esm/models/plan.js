import * as s from "../core/validation/index.js";
import { billingCycleInternalSchema, billingCycleSchema } from "./billing-cycle.js";
import { oneTimeChargeInternalSchema, oneTimeChargeSchema } from "./one-time-charge.js";
const planProperties = {
    billingCycles: s.array(s.lazy(() => billingCycleInternalSchema)),
    oneTimeCharges: oneTimeChargeInternalSchema,
    name: s.optional(s.string()),
    _keysMap: {
        billingCycles: "billing_cycles",
        oneTimeCharges: "one_time_charges",
    },
};
export const planInternalSchema = s.object(planProperties, {
    additionalProperties: s.json(),
});
export const planSchema = s.lazySchema(() => s.object({
    ...planProperties,
    billingCycles: s.array(s.lazy(() => billingCycleSchema)).check(s.minLength(1), s.maxLength(3)),
    oneTimeCharges: oneTimeChargeSchema,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^[A-Za-z0-9() +',.:-]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=plan.js.map