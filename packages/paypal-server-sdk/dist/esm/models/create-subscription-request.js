import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { planOverrideInternalSchema, planOverrideSchema } from "./plan-override.js";
import { subscriberRequestInternalSchema, subscriberRequestSchema, } from "./subscriber-request.js";
import { subscriptionApplicationContextInternalSchema, subscriptionApplicationContextSchema, } from "./subscription-application-context.js";
const createSubscriptionRequestProperties = {
    planId: s.string(),
    startTime: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    subscriber: s.optional(s.lazy(() => subscriberRequestInternalSchema)),
    autoRenewal: s.defaulted(s.boolean(), false),
    applicationContext: s.optional(s.lazy(() => subscriptionApplicationContextInternalSchema)),
    customId: s.optional(s.string()),
    plan: s.optional(s.lazy(() => planOverrideInternalSchema)),
    _keysMap: {
        planId: "plan_id",
        startTime: "start_time",
        shippingAmount: "shipping_amount",
        autoRenewal: "auto_renewal",
        applicationContext: "application_context",
        customId: "custom_id",
    },
};
export const createSubscriptionRequestInternalSchema = s.object(createSubscriptionRequestProperties, {
    additionalProperties: s.json(),
});
export const createSubscriptionRequestSchema = s.lazySchema(() => s.object({
    ...createSubscriptionRequestProperties,
    planId: s.string().check(s.minLength(26), s.maxLength(26), s.pattern("^P-[A-Z0-9]*$")),
    startTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    quantity: s.optional(s.string().check(s.minLength(1), s.maxLength(32), s.pattern("^([0-9]+|([0-9]+)?[.][0-9]+)$"))),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    subscriber: s.optional(s.lazy(() => subscriberRequestSchema)),
    applicationContext: s.optional(s.lazy(() => subscriptionApplicationContextSchema)),
    customId: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^[\\x20-\\x7E]+"))),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=create-subscription-request.js.map