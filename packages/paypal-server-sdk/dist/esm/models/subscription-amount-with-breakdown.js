import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const subscriptionAmountWithBreakdownProperties = {
    grossAmount: moneyInternalSchema,
    totalItemAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    feeAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    taxAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    netAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    _keysMap: {
        grossAmount: "gross_amount",
        totalItemAmount: "total_item_amount",
        feeAmount: "fee_amount",
        shippingAmount: "shipping_amount",
        taxAmount: "tax_amount",
        netAmount: "net_amount",
    },
};
export const subscriptionAmountWithBreakdownInternalSchema = s.object(subscriptionAmountWithBreakdownProperties, {
    additionalProperties: s.json(),
});
export const subscriptionAmountWithBreakdownSchema = s.lazySchema(() => s.object({
    ...subscriptionAmountWithBreakdownProperties,
    grossAmount: moneySchema,
    totalItemAmount: s.optional(s.lazy(() => moneySchema)),
    feeAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    taxAmount: s.optional(s.lazy(() => moneySchema)),
    netAmount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-amount-with-breakdown.js.map