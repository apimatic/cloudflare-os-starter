import * as s from "../core/validation/index.js";
import { customerResponseInternalSchema, customerResponseSchema, } from "./customer-response.js";
import { linkDescriptionSchema } from "./link-description.js";
import { paymentTokenResponsePaymentSourceInternalSchema, paymentTokenResponsePaymentSourceSchema, } from "./payment-token-response-payment-source.js";
const paymentTokenResponseProperties = {
    id: s.optional(s.string()),
    customer: s.optional(s.lazy(() => customerResponseInternalSchema)),
    paymentSource: s.optional(s.lazy(() => paymentTokenResponsePaymentSourceInternalSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        paymentSource: "payment_source",
    },
};
export const paymentTokenResponseInternalSchema = s.object(paymentTokenResponseProperties, { additionalProperties: s.json() });
export const paymentTokenResponseSchema = s.lazySchema(() => s.object({
    ...paymentTokenResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
    customer: s.optional(s.lazy(() => customerResponseSchema)),
    paymentSource: s.optional(s.lazy(() => paymentTokenResponsePaymentSourceSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(32))),
}, { additionalProperties: s.json() }));
