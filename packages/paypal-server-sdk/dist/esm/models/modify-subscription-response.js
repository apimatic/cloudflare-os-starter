import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { planOverrideInternalSchema, planOverrideSchema } from "./plan-override.js";
import { shippingDetailsSubscriptionsInternalSchema, shippingDetailsSubscriptionsSchema, } from "./shipping-details-subscriptions.js";
const modifySubscriptionResponseProperties = {
    planId: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsInternalSchema)),
    plan: s.optional(s.lazy(() => planOverrideInternalSchema)),
    planOverridden: s.optional(s.boolean()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        planId: "plan_id",
        shippingAmount: "shipping_amount",
        shippingAddress: "shipping_address",
        planOverridden: "plan_overridden",
    },
};
export const modifySubscriptionResponseInternalSchema = s.object(modifySubscriptionResponseProperties, {
    additionalProperties: s.json(),
});
export const modifySubscriptionResponseSchema = s.lazySchema(() => s.object({
    ...modifySubscriptionResponseProperties,
    planId: s.optional(s.string().check(s.minLength(26), s.maxLength(26), s.pattern("^P-[A-Z0-9]*$"))),
    quantity: s.optional(s.string().check(s.minLength(1), s.maxLength(32), s.pattern("^([0-9]+|([0-9]+)?[.][0-9]+)$"))),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSubscriptionsSchema)),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
}, { additionalProperties: s.json() }));
