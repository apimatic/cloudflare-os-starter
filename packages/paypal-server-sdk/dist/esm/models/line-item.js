import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { orderBillingPlanInternalSchema, orderBillingPlanSchema, } from "./order-billing-plan.js";
import { universalProductCodeInternalSchema, universalProductCodeSchema, } from "./universal-product-code.js";
const lineItemProperties = {
    name: s.string(),
    quantity: s.string(),
    description: s.optional(s.string()),
    sku: s.optional(s.string()),
    url: s.optional(s.string()),
    imageUrl: s.optional(s.string()),
    upc: s.optional(s.lazy(() => universalProductCodeInternalSchema)),
    billingPlan: s.optional(s.lazy(() => orderBillingPlanInternalSchema)),
    unitAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    tax: s.optional(s.lazy(() => moneyInternalSchema)),
    commodityCode: s.optional(s.string()),
    discountAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    totalAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    unitOfMeasure: s.optional(s.string()),
    _keysMap: {
        imageUrl: "image_url",
        billingPlan: "billing_plan",
        unitAmount: "unit_amount",
        commodityCode: "commodity_code",
        discountAmount: "discount_amount",
        totalAmount: "total_amount",
        unitOfMeasure: "unit_of_measure",
    },
};
export const lineItemInternalSchema = s.object(lineItemProperties, {
    additionalProperties: s.json(),
});
export const lineItemSchema = s.lazySchema(() => s.object({
    ...lineItemProperties,
    name: s.string().check(s.minLength(1), s.maxLength(127)),
    quantity: s.string().check(s.maxLength(10), s.pattern("^[1-9][0-9]{0,9}$")),
    description: s.optional(s.string().check(s.maxLength(2048))),
    sku: s.optional(s.string().check(s.maxLength(127))),
    url: s.optional(s.string().check(s.minLength(1), s.maxLength(2048), s.url())),
    imageUrl: s.optional(s
        .string()
        .check(s.minLength(1), s.maxLength(2048), s.pattern("^(https:)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg|JPG|GIF|PNG|JPEG)(\\?.*)?$"), s.url())),
    upc: s.optional(s.lazy(() => universalProductCodeSchema)),
    billingPlan: s.optional(s.lazy(() => orderBillingPlanSchema)),
    unitAmount: s.optional(s.lazy(() => moneySchema)),
    tax: s.optional(s.lazy(() => moneySchema)),
    commodityCode: s.optional(s.string().check(s.minLength(1), s.maxLength(12), s.pattern("^[a-zA-Z0-9_'.-]*$"))),
    discountAmount: s.optional(s.lazy(() => moneySchema)),
    totalAmount: s.optional(s.lazy(() => moneySchema)),
    unitOfMeasure: s.optional(s.string().check(s.minLength(1), s.maxLength(12), s.pattern("^[a-zA-Z0-9_'.-]*$"))),
}, { additionalProperties: s.json() }));
