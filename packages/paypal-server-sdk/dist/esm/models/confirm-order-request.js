import * as s from "../core/validation/index.js";
import { orderConfirmApplicationContextInternalSchema, orderConfirmApplicationContextSchema, } from "./order-confirm-application-context.js";
import { paymentSourceInternalSchema, paymentSourceSchema } from "./payment-source.js";
const confirmOrderRequestProperties = {
    paymentSource: paymentSourceInternalSchema,
    applicationContext: s.optional(s.lazy(() => orderConfirmApplicationContextInternalSchema)),
    _keysMap: {
        paymentSource: "payment_source",
        applicationContext: "application_context",
    },
};
export const confirmOrderRequestInternalSchema = s.object(confirmOrderRequestProperties, { additionalProperties: s.json() });
export const confirmOrderRequestSchema = s.lazySchema(() => s.object({
    ...confirmOrderRequestProperties,
    paymentSource: paymentSourceSchema,
    applicationContext: s.optional(s.lazy(() => orderConfirmApplicationContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=confirm-order-request.js.map