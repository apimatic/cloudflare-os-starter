import * as s from "../core/validation/index.js";
import { orderCaptureRequestPaymentSourceInternalSchema, orderCaptureRequestPaymentSourceSchema, } from "./order-capture-request-payment-source.js";
const orderCaptureRequestProperties = {
    paymentSource: s.optional(s.lazy(() => orderCaptureRequestPaymentSourceInternalSchema)),
    _keysMap: {
        paymentSource: "payment_source",
    },
};
export const orderCaptureRequestInternalSchema = s.object(orderCaptureRequestProperties, { additionalProperties: s.json() });
export const orderCaptureRequestSchema = s.lazySchema(() => s.object({
    ...orderCaptureRequestProperties,
    paymentSource: s.optional(s.lazy(() => orderCaptureRequestPaymentSourceSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=order-capture-request.js.map