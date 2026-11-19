import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const oneTimeChargeProperties = {
    setupFee: s.optional(s.lazy(() => moneyInternalSchema)),
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    taxes: s.optional(s.lazy(() => moneyInternalSchema)),
    productPrice: s.optional(s.lazy(() => moneyInternalSchema)),
    subtotal: s.optional(s.lazy(() => moneyInternalSchema)),
    totalAmount: moneyInternalSchema,
    _keysMap: {
        setupFee: "setup_fee",
        shippingAmount: "shipping_amount",
        productPrice: "product_price",
        totalAmount: "total_amount",
    },
};
export const oneTimeChargeInternalSchema = s.object(oneTimeChargeProperties, { additionalProperties: s.json() });
export const oneTimeChargeSchema = s.lazySchema(() => s.object({
    ...oneTimeChargeProperties,
    setupFee: s.optional(s.lazy(() => moneySchema)),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    taxes: s.optional(s.lazy(() => moneySchema)),
    productPrice: s.optional(s.lazy(() => moneySchema)),
    subtotal: s.optional(s.lazy(() => moneySchema)),
    totalAmount: moneySchema,
}, { additionalProperties: s.json() }));
//# sourceMappingURL=one-time-charge.js.map