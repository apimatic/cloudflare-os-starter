import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { merchantPreferencesInternalSchema, merchantPreferencesSchema, } from "./merchant-preferences.js";
import { paymentPreferencesInternalSchema, paymentPreferencesSchema, } from "./payment-preferences.js";
import { subscriptionBillingCycleInternalSchema, subscriptionBillingCycleSchema, } from "./subscription-billing-cycle.js";
import { subscriptionPlanStatusSchema } from "./subscription-plan-status.js";
import { taxesInternalSchema, taxesSchema } from "./taxes.js";
const billingPlanProperties = {
    id: s.optional(s.string()),
    productId: s.optional(s.string()),
    name: s.optional(s.string()),
    status: s.optional(s.lazy(() => subscriptionPlanStatusSchema)),
    description: s.optional(s.string()),
    billingCycles: s.optional(s.array(s.lazy(() => subscriptionBillingCycleInternalSchema))),
    paymentPreferences: s.optional(s.lazy(() => paymentPreferencesInternalSchema)),
    merchantPreferences: s.optional(s.lazy(() => merchantPreferencesInternalSchema)),
    taxes: s.optional(s.lazy(() => taxesInternalSchema)),
    quantitySupported: s.defaulted(s.boolean(), false),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        productId: "product_id",
        billingCycles: "billing_cycles",
        paymentPreferences: "payment_preferences",
        merchantPreferences: "merchant_preferences",
        quantitySupported: "quantity_supported",
        createTime: "create_time",
        updateTime: "update_time",
    },
};
export const billingPlanInternalSchema = s.object(billingPlanProperties, {
    additionalProperties: s.json(),
});
export const billingPlanSchema = s.lazySchema(() => s.object({
    ...billingPlanProperties,
    id: s.optional(s.string().check(s.minLength(26), s.maxLength(26), s.pattern("^P-[A-Z0-9]*$"))),
    productId: s.optional(s.string().check(s.minLength(22), s.maxLength(22), s.pattern("^PROD-[A-Z0-9]*$"))),
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    billingCycles: s.optional(s.array(s.lazy(() => subscriptionBillingCycleSchema)).check(s.minLength(1), s.maxLength(12))),
    paymentPreferences: s.optional(s.lazy(() => paymentPreferencesSchema)),
    merchantPreferences: s.optional(s.lazy(() => merchantPreferencesSchema)),
    taxes: s.optional(s.lazy(() => taxesSchema)),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
