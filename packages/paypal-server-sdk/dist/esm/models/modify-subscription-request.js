import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { planOverrideInternalSchema, planOverrideSchema } from "./plan-override.js";
import { shippingDetailsSubscriptionsInternalSchema, shippingDetailsSubscriptionsSchema, } from "./shipping-details-subscriptions.js";
import { subscriptionPatchApplicationContextInternalSchema, subscriptionPatchApplicationContextSchema, } from "./subscription-patch-application-context.js";
const modifySubscriptionRequestProperties = {
    planId: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsInternalSchema)),
    applicationContext: s.optional(s.lazy(() => subscriptionPatchApplicationContextInternalSchema)),
    plan: s.optional(s.lazy(() => planOverrideInternalSchema)),
    _keysMap: {
        planId: "plan_id",
        shippingAmount: "shipping_amount",
        shippingAddress: "shipping_address",
        applicationContext: "application_context",
    },
};
export const modifySubscriptionRequestInternalSchema = s.object(modifySubscriptionRequestProperties, {
    additionalProperties: s.json(),
});
export const modifySubscriptionRequestSchema = s.lazySchema(() => s.object({
    ...modifySubscriptionRequestProperties,
    planId: s.optional(s.string().check(s.minLength(26), s.maxLength(26), s.pattern("^P-[A-Z0-9]*$"))),
    quantity: s.optional(s.string().check(s.minLength(1), s.maxLength(32), s.pattern("^([0-9]+|([0-9]+)?[.][0-9]+)$"))),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsSchema)),
    applicationContext: s.optional(s.lazy(() => subscriptionPatchApplicationContextSchema)),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
}, { additionalProperties: s.json() }));
