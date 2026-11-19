import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardTypeSchema } from "./card-type.js";
const googlePayRequestCardProperties = {
    name: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        billingAddress: "billing_address",
    },
};
export const googlePayRequestCardInternalSchema = s.object(googlePayRequestCardProperties, { additionalProperties: s.json() });
export const googlePayRequestCardSchema = s.lazySchema(() => s.object({
    ...googlePayRequestCardProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
