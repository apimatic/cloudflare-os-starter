import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const amountBreakdownProperties = {
    itemTotal: s.optional(s.lazy(() => moneyInternalSchema)),
    shipping: s.optional(s.lazy(() => moneyInternalSchema)),
    handling: s.optional(s.lazy(() => moneyInternalSchema)),
    taxTotal: s.optional(s.lazy(() => moneyInternalSchema)),
    insurance: s.optional(s.lazy(() => moneyInternalSchema)),
    shippingDiscount: s.optional(s.lazy(() => moneyInternalSchema)),
    discount: s.optional(s.lazy(() => moneyInternalSchema)),
    _keysMap: {
        itemTotal: "item_total",
        taxTotal: "tax_total",
        shippingDiscount: "shipping_discount",
    },
};
export const amountBreakdownInternalSchema = s.object(amountBreakdownProperties, { additionalProperties: s.json() });
export const amountBreakdownSchema = s.lazySchema(() => s.object({
    ...amountBreakdownProperties,
    itemTotal: s.optional(s.lazy(() => moneySchema)),
    shipping: s.optional(s.lazy(() => moneySchema)),
    handling: s.optional(s.lazy(() => moneySchema)),
    taxTotal: s.optional(s.lazy(() => moneySchema)),
    insurance: s.optional(s.lazy(() => moneySchema)),
    shippingDiscount: s.optional(s.lazy(() => moneySchema)),
    discount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
