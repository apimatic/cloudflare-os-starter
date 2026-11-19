import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardTypeSchema } from "./card-type.js";
const googlePayCardProperties = {
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    lastDigits: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        lastDigits: "last_digits",
        billingAddress: "billing_address",
    },
};
export const googlePayCardInternalSchema = s.object(googlePayCardProperties, { additionalProperties: s.json() });
export const googlePayCardSchema = s.lazySchema(() => s.object({
    ...googlePayCardProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    number: s.optional(s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    lastDigits: s.optional(s.string().check(s.minLength(2), s.maxLength(4), s.pattern("^[0-9]{2,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=google-pay-card.js.map