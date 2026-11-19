import * as s from "../core/validation/index.js";
import { customerInternalSchema, customerSchema } from "./customer.js";
import { setupTokenRequestPaymentSourceInternalSchema, setupTokenRequestPaymentSourceSchema, } from "./setup-token-request-payment-source.js";
const setupTokenRequestProperties = {
    customer: s.optional(s.lazy(() => customerInternalSchema)),
    paymentSource: setupTokenRequestPaymentSourceInternalSchema,
    _keysMap: {
        paymentSource: "payment_source",
    },
};
export const setupTokenRequestInternalSchema = s.object(setupTokenRequestProperties, { additionalProperties: s.json() });
export const setupTokenRequestSchema = s.lazySchema(() => s.object({
    ...setupTokenRequestProperties,
    customer: s.optional(s.lazy(() => customerSchema)),
    paymentSource: setupTokenRequestPaymentSourceSchema,
}, { additionalProperties: s.json() }));
