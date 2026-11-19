import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardTypeSchema } from "./card-type.js";
const applePayCardProperties = {
    name: s.optional(s.string()),
    lastDigits: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        lastDigits: "last_digits",
        billingAddress: "billing_address",
    },
};
export const applePayCardInternalSchema = s.object(applePayCardProperties, { additionalProperties: s.json() });
export const applePayCardSchema = s.lazySchema(() => s.object({
    ...applePayCardProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    lastDigits: s.optional(s.string().check(s.minLength(2), s.maxLength(4), s.pattern("^[0-9]{2,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
