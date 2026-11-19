import * as s from "../core/validation/index.js";
import { customerInternalSchema, customerSchema } from "./customer.js";
import { paymentTokenRequestPaymentSourceInternalSchema, paymentTokenRequestPaymentSourceSchema, } from "./payment-token-request-payment-source.js";
const paymentTokenRequestProperties = {
    customer: s.optional(s.lazy(() => customerInternalSchema)),
    paymentSource: paymentTokenRequestPaymentSourceInternalSchema,
    _keysMap: {
        paymentSource: "payment_source",
    },
};
export const paymentTokenRequestInternalSchema = s.object(paymentTokenRequestProperties, { additionalProperties: s.json() });
export const paymentTokenRequestSchema = s.lazySchema(() => s.object({
    ...paymentTokenRequestProperties,
    customer: s.optional(s.lazy(() => customerSchema)),
    paymentSource: paymentTokenRequestPaymentSourceSchema,
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payment-token-request.js.map