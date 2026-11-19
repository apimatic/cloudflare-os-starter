import * as s from "../core/validation/index.js";
import { billingCycleInternalSchema, billingCycleSchema } from "./billing-cycle.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const orderBillingPlanProperties = {
    billingCycles: s.array(s.lazy(() => billingCycleInternalSchema)),
    setupFee: s.optional(s.lazy(() => moneyInternalSchema)),
    name: s.optional(s.string()),
    _keysMap: {
        billingCycles: "billing_cycles",
        setupFee: "setup_fee",
    },
};
export const orderBillingPlanInternalSchema = s.object(orderBillingPlanProperties, { additionalProperties: s.json() });
export const orderBillingPlanSchema = s.lazySchema(() => s.object({
    ...orderBillingPlanProperties,
    billingCycles: s.array(s.lazy(() => billingCycleSchema)).check(s.minLength(1), s.maxLength(3)),
    setupFee: s.optional(s.lazy(() => moneySchema)),
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^[A-Za-z0-9() +',.:-]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=order-billing-plan.js.map