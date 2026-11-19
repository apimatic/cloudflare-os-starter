import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { pricingModelSchema } from "./pricing-model.js";
const pricingSchemeProperties = {
    price: s.optional(s.lazy(() => moneyInternalSchema)),
    pricingModel: pricingModelSchema,
    reloadThresholdAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    _keysMap: {
        pricingModel: "pricing_model",
        reloadThresholdAmount: "reload_threshold_amount",
    },
};
export const pricingSchemeInternalSchema = s.object(pricingSchemeProperties, { additionalProperties: s.json() });
export const pricingSchemeSchema = s.lazySchema(() => s.object({
    ...pricingSchemeProperties,
    price: s.optional(s.lazy(() => moneySchema)),
    reloadThresholdAmount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
