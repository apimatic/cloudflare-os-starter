import * as s from "../core/validation/index.js";
import { customerInternalSchema, customerSchema } from "./customer.js";
import { linkDescriptionSchema } from "./link-description.js";
import { PaymentTokenStatus, paymentTokenStatusSchema } from "./payment-token-status.js";
import { setupTokenResponsePaymentSourceInternalSchema, setupTokenResponsePaymentSourceSchema, } from "./setup-token-response-payment-source.js";
const setupTokenResponseProperties = {
    id: s.optional(s.string()),
    customer: s.optional(s.lazy(() => customerInternalSchema)),
    status: s.defaulted(paymentTokenStatusSchema, PaymentTokenStatus.Created),
    paymentSource: s.optional(s.lazy(() => setupTokenResponsePaymentSourceInternalSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        paymentSource: "payment_source",
    },
};
export const setupTokenResponseInternalSchema = s.object(setupTokenResponseProperties, { additionalProperties: s.json() });
export const setupTokenResponseSchema = s.lazySchema(() => s.object({
    ...setupTokenResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    customer: s.optional(s.lazy(() => customerSchema)),
    paymentSource: s.optional(s.lazy(() => setupTokenResponsePaymentSourceSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(32))),
}, { additionalProperties: s.json() }));
