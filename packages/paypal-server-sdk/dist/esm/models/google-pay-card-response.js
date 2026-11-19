import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { authenticationResponseSchema } from "./authentication-response.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardTypeSchema } from "./card-type.js";
const googlePayCardResponseProperties = {
    name: s.optional(s.string()),
    lastDigits: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    authenticationResult: s.optional(s.lazy(() => authenticationResponseSchema)),
    _keysMap: {
        lastDigits: "last_digits",
        billingAddress: "billing_address",
        authenticationResult: "authentication_result",
    },
};
export const googlePayCardResponseInternalSchema = s.object(googlePayCardResponseProperties, { additionalProperties: s.json() });
export const googlePayCardResponseSchema = s.lazySchema(() => s.object({
    ...googlePayCardResponseProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    lastDigits: s.optional(s.string().check(s.minLength(2), s.maxLength(4), s.pattern("^[0-9]{2,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
