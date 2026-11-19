import * as s from "../core/validation/index.js";
import { itemCategorySchema } from "./item-category.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { orderBillingPlanInternalSchema, orderBillingPlanSchema, } from "./order-billing-plan.js";
import { universalProductCodeInternalSchema, universalProductCodeSchema, } from "./universal-product-code.js";
const itemRequestProperties = {
    name: s.string(),
    unitAmount: moneyInternalSchema,
    tax: s.optional(s.lazy(() => moneyInternalSchema)),
    quantity: s.string(),
    description: s.optional(s.string()),
    sku: s.optional(s.string()),
    url: s.optional(s.string()),
    category: s.optional(s.lazy(() => itemCategorySchema)),
    imageUrl: s.optional(s.string()),
    upc: s.optional(s.lazy(() => universalProductCodeInternalSchema)),
    billingPlan: s.optional(s.lazy(() => orderBillingPlanInternalSchema)),
    _keysMap: {
        unitAmount: "unit_amount",
        imageUrl: "image_url",
        billingPlan: "billing_plan",
    },
};
export const itemRequestInternalSchema = s.object(itemRequestProperties, {
    additionalProperties: s.json(),
});
export const itemRequestSchema = s.lazySchema(() => s.object({
    ...itemRequestProperties,
    name: s.string().check(s.minLength(1), s.maxLength(127)),
    unitAmount: moneySchema,
    tax: s.optional(s.lazy(() => moneySchema)),
    quantity: s.string().check(s.maxLength(10), s.pattern("^[1-9][0-9]{0,9}$")),
    description: s.optional(s.string().check(s.maxLength(4000))),
    sku: s.optional(s.string().check(s.maxLength(127))),
    url: s.optional(s.string().check(s.minLength(1), s.maxLength(2048), s.url())),
    imageUrl: s.optional(s
        .string()
        .check(s.minLength(1), s.maxLength(2048), s.pattern("^(https:)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg|JPG|GIF|PNG|JPEG)"), s.url())),
    upc: s.optional(s.lazy(() => universalProductCodeSchema)),
    billingPlan: s.optional(s.lazy(() => orderBillingPlanSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=item-request.js.map