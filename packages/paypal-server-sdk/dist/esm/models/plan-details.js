import * as s from "../core/validation/index.js";
import { merchantPreferencesInternalSchema, merchantPreferencesSchema, } from "./merchant-preferences.js";
import { paymentPreferencesInternalSchema, paymentPreferencesSchema, } from "./payment-preferences.js";
import { subscriptionBillingCycleInternalSchema, subscriptionBillingCycleSchema, } from "./subscription-billing-cycle.js";
import { taxesInternalSchema, taxesSchema } from "./taxes.js";
const planDetailsProperties = {
    productId: s.optional(s.string()),
    name: s.optional(s.string()),
    description: s.optional(s.string()),
    billingCycles: s.optional(s.array(s.lazy(() => subscriptionBillingCycleInternalSchema))),
    paymentPreferences: s.optional(s.lazy(() => paymentPreferencesInternalSchema)),
    merchantPreferences: s.optional(s.lazy(() => merchantPreferencesInternalSchema)),
    taxes: s.optional(s.lazy(() => taxesInternalSchema)),
    quantitySupported: s.defaulted(s.boolean(), false),
    _keysMap: {
        productId: "product_id",
        billingCycles: "billing_cycles",
        paymentPreferences: "payment_preferences",
        merchantPreferences: "merchant_preferences",
        quantitySupported: "quantity_supported",
    },
};
export const planDetailsInternalSchema = s.object(planDetailsProperties, {
    additionalProperties: s.json(),
});
export const planDetailsSchema = s.lazySchema(() => s.object({
    ...planDetailsProperties,
    productId: s.optional(s.string().check(s.minLength(22), s.maxLength(22), s.pattern("^PROD-[A-Z0-9]*$"))),
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    billingCycles: s.optional(s.array(s.lazy(() => subscriptionBillingCycleSchema)).check(s.minLength(1), s.maxLength(12))),
    paymentPreferences: s.optional(s.lazy(() => paymentPreferencesSchema)),
    merchantPreferences: s.optional(s.lazy(() => merchantPreferencesSchema)),
    taxes: s.optional(s.lazy(() => taxesSchema)),
}, { additionalProperties: s.json() }));
