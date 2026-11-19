import * as s from "../core/validation/index.js";
import { checkoutPaymentIntentSchema } from "./checkout-payment-intent.js";
import { orderApplicationContextInternalSchema, orderApplicationContextSchema, } from "./order-application-context.js";
import { payerInternalSchema, payerSchema } from "./payer.js";
import { paymentSourceInternalSchema, paymentSourceSchema } from "./payment-source.js";
import { purchaseUnitRequestInternalSchema, purchaseUnitRequestSchema, } from "./purchase-unit-request.js";
const orderRequestProperties = {
    intent: checkoutPaymentIntentSchema,
    payer: s.optional(s.lazy(() => payerInternalSchema)),
    purchaseUnits: s.array(s.lazy(() => purchaseUnitRequestInternalSchema)),
    paymentSource: s.optional(s.lazy(() => paymentSourceInternalSchema)),
    applicationContext: s.optional(s.lazy(() => orderApplicationContextInternalSchema)),
    _keysMap: {
        purchaseUnits: "purchase_units",
        paymentSource: "payment_source",
        applicationContext: "application_context",
    },
};
export const orderRequestInternalSchema = s.object(orderRequestProperties, { additionalProperties: s.json() });
export const orderRequestSchema = s.lazySchema(() => s.object({
    ...orderRequestProperties,
    payer: s.optional(s.lazy(() => payerSchema)),
    purchaseUnits: s.array(s.lazy(() => purchaseUnitRequestSchema)).check(s.minLength(1), s.maxLength(10)),
    paymentSource: s.optional(s.lazy(() => paymentSourceSchema)),
    applicationContext: s.optional(s.lazy(() => orderApplicationContextSchema)),
}, { additionalProperties: s.json() }));
