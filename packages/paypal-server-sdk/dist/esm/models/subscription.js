import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { planDetailsInternalSchema, planDetailsSchema } from "./plan-details.js";
import { statusSchema } from "./status.js";
import { subscriberInternalSchema, subscriberSchema } from "./subscriber.js";
import { subscriptionBillingInformationInternalSchema, subscriptionBillingInformationSchema, } from "./subscription-billing-information.js";
const subscriptionProperties = {
    status: s.optional(s.lazy(() => statusSchema)),
    statusChangeNote: s.optional(s.string()),
    statusUpdateTime: s.optional(s.string()),
    id: s.optional(s.string()),
    planId: s.optional(s.string()),
    startTime: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    subscriber: s.optional(s.lazy(() => subscriberInternalSchema)),
    billingInfo: s.optional(s.lazy(() => subscriptionBillingInformationInternalSchema)),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    customId: s.optional(s.string()),
    planOverridden: s.optional(s.boolean()),
    plan: s.optional(s.lazy(() => planDetailsInternalSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        statusChangeNote: "status_change_note",
        statusUpdateTime: "status_update_time",
        planId: "plan_id",
        startTime: "start_time",
        shippingAmount: "shipping_amount",
        billingInfo: "billing_info",
        createTime: "create_time",
        updateTime: "update_time",
        customId: "custom_id",
        planOverridden: "plan_overridden",
    },
};
export const subscriptionInternalSchema = s.object(subscriptionProperties, { additionalProperties: s.json() });
export const subscriptionSchema = s.lazySchema(() => s.object({
    ...subscriptionProperties,
    statusChangeNote: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
    statusUpdateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    id: s.optional(s.string().check(s.minLength(3), s.maxLength(50))),
    planId: s.optional(s.string().check(s.minLength(3), s.maxLength(50))),
    startTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    quantity: s.optional(s.string().check(s.minLength(1), s.maxLength(32), s.pattern("^([0-9]+|([0-9]+)?[.][0-9]+)$"))),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    subscriber: s.optional(s.lazy(() => subscriberSchema)),
    billingInfo: s.optional(s.lazy(() => subscriptionBillingInformationSchema)),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    customId: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^[\\x20-\\x7E]+"))),
    plan: s.optional(s.lazy(() => planDetailsSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription.js.map