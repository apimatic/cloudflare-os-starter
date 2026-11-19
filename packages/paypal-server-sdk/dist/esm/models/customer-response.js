import * as s from "../core/validation/index.js";
const customerResponseProperties = {
    id: s.optional(s.string()),
    merchantCustomerId: s.optional(s.string()),
    _keysMap: {
        merchantCustomerId: "merchant_customer_id",
    },
};
export const customerResponseInternalSchema = s.object(customerResponseProperties, { additionalProperties: s.json() });
export const customerResponseSchema = s.lazySchema(() => s.object({
    ...customerResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(22), s.pattern("^[0-9a-zA-Z_-]+$"))),
    merchantCustomerId: s.optional(s.string().check(s.minLength(1), s.maxLength(64), s.pattern("^[0-9a-zA-Z-_.^*$@#]+$"))),
}, { additionalProperties: s.json() }));
