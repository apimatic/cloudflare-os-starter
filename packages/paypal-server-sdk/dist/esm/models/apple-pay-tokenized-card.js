import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardTypeSchema } from "./card-type.js";
const applePayTokenizedCardProperties = {
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    cardType: s.optional(s.lazy(() => cardBrandSchema)),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        cardType: "card_type",
        billingAddress: "billing_address",
    },
};
export const applePayTokenizedCardInternalSchema = s.object(applePayTokenizedCardProperties, { additionalProperties: s.json() });
export const applePayTokenizedCardSchema = s.lazySchema(() => s.object({
    ...applePayTokenizedCardProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    number: s.optional(s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
