import * as s from "../core/validation/index.js";
import { orderAuthorizeRequestPaymentSourceInternalSchema, orderAuthorizeRequestPaymentSourceSchema, } from "./order-authorize-request-payment-source.js";
const orderAuthorizeRequestProperties = {
    paymentSource: s.optional(s.lazy(() => orderAuthorizeRequestPaymentSourceInternalSchema)),
    _keysMap: {
        paymentSource: "payment_source",
    },
};
export const orderAuthorizeRequestInternalSchema = s.object(orderAuthorizeRequestProperties, { additionalProperties: s.json() });
export const orderAuthorizeRequestSchema = s.lazySchema(() => s.object({
    ...orderAuthorizeRequestProperties,
    paymentSource: s.optional(s.lazy(() => orderAuthorizeRequestPaymentSourceSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=order-authorize-request.js.map