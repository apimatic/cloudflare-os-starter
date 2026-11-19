import * as s from "../core/validation/index.js";
import { billingCycleOverrideInternalSchema, billingCycleOverrideSchema, } from "./billing-cycle-override.js";
import { paymentPreferencesOverrideInternalSchema, paymentPreferencesOverrideSchema, } from "./payment-preferences-override.js";
import { taxesOverrideInternalSchema, taxesOverrideSchema } from "./taxes-override.js";
const planOverrideProperties = {
    billingCycles: s.optional(s.array(s.lazy(() => billingCycleOverrideInternalSchema))),
    paymentPreferences: s.optional(s.lazy(() => paymentPreferencesOverrideInternalSchema)),
    taxes: s.optional(s.lazy(() => taxesOverrideInternalSchema)),
    _keysMap: {
        billingCycles: "billing_cycles",
        paymentPreferences: "payment_preferences",
    },
};
export const planOverrideInternalSchema = s.object(planOverrideProperties, { additionalProperties: s.json() });
export const planOverrideSchema = s.lazySchema(() => s.object({
    ...planOverrideProperties,
    billingCycles: s.optional(s.array(s.lazy(() => billingCycleOverrideSchema)).check(s.minLength(1), s.maxLength(12))),
    paymentPreferences: s.optional(s.lazy(() => paymentPreferencesOverrideSchema)),
    taxes: s.optional(s.lazy(() => taxesOverrideSchema)),
}, { additionalProperties: s.json() }));
