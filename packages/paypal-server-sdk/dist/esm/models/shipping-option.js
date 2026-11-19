import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { shippingTypeSchema } from "./shipping-type.js";
const shippingOptionProperties = {
    id: s.string(),
    label: s.string(),
    type: s.optional(s.lazy(() => shippingTypeSchema)),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    selected: s.boolean(),
};
export const shippingOptionInternalSchema = s.object(shippingOptionProperties, { additionalProperties: s.json() });
export const shippingOptionSchema = s.lazySchema(() => s.object({
    ...shippingOptionProperties,
    id: s.string().check(s.maxLength(127)),
    label: s.string().check(s.maxLength(127)),
    amount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
