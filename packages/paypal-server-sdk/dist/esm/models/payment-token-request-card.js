import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
const paymentTokenRequestCardProperties = {
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        securityCode: "security_code",
        billingAddress: "billing_address",
    },
};
export const paymentTokenRequestCardInternalSchema = s.object(paymentTokenRequestCardProperties, { additionalProperties: s.json() });
export const paymentTokenRequestCardSchema = s.lazySchema(() => s.object({
    ...paymentTokenRequestCardProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    number: s.optional(s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    securityCode: s.optional(s.string().check(s.minLength(3), s.maxLength(4), s.pattern("^[0-9]{3,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
