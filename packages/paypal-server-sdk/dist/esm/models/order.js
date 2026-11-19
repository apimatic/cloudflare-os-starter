import * as s from "../core/validation/index.js";
import { checkoutPaymentIntentSchema } from "./checkout-payment-intent.js";
import { linkDescriptionSchema } from "./link-description.js";
import { orderStatusSchema } from "./order-status.js";
import { payerInternalSchema, payerSchema } from "./payer.js";
import { paymentSourceResponseInternalSchema, paymentSourceResponseSchema, } from "./payment-source-response.js";
import { purchaseUnitInternalSchema, purchaseUnitSchema } from "./purchase-unit.js";
const orderProperties = {
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    id: s.optional(s.string()),
    paymentSource: s.optional(s.lazy(() => paymentSourceResponseInternalSchema)),
    intent: s.optional(s.lazy(() => checkoutPaymentIntentSchema)),
    payer: s.optional(s.lazy(() => payerInternalSchema)),
    purchaseUnits: s.optional(s.array(s.lazy(() => purchaseUnitInternalSchema))),
    status: s.optional(s.lazy(() => orderStatusSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        createTime: "create_time",
        updateTime: "update_time",
        paymentSource: "payment_source",
        purchaseUnits: "purchase_units",
    },
};
export const orderInternalSchema = s.object(orderProperties, {
    additionalProperties: s.json(),
});
export const orderSchema = s.lazySchema(() => s.object({
    ...orderProperties,
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    paymentSource: s.optional(s.lazy(() => paymentSourceResponseSchema)),
    payer: s.optional(s.lazy(() => payerSchema)),
    purchaseUnits: s.optional(s.array(s.lazy(() => purchaseUnitSchema)).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
