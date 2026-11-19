import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { pricingTierInternalSchema, pricingTierSchema } from "./pricing-tier.js";
import { subscriptionPricingModelSchema, } from "./subscription-pricing-model.js";
const subscriptionPricingSchemeProperties = {
    version: s.optional(s.int()),
    fixedPrice: s.optional(s.lazy(() => moneyInternalSchema)),
    pricingModel: s.optional(s.lazy(() => subscriptionPricingModelSchema)),
    tiers: s.optional(s.array(s.lazy(() => pricingTierInternalSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    _keysMap: {
        fixedPrice: "fixed_price",
        pricingModel: "pricing_model",
        createTime: "create_time",
        updateTime: "update_time",
    },
};
export const subscriptionPricingSchemeInternalSchema = s.object(subscriptionPricingSchemeProperties, {
    additionalProperties: s.json(),
});
export const subscriptionPricingSchemeSchema = s.lazySchema(() => s.object({
    ...subscriptionPricingSchemeProperties,
    version: s.optional(s.int().check(s.gte(0), s.lte(999))),
    fixedPrice: s.optional(s.lazy(() => moneySchema)),
    tiers: s.optional(s.array(s.lazy(() => pricingTierSchema)).check(s.minLength(1), s.maxLength(32))),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-pricing-scheme.js.map