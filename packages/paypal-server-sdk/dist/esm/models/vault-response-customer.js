import * as s from "../core/validation/index.js";
const vaultResponseCustomerProperties = {
    id: s.optional(s.string()),
    merchantCustomerId: s.optional(s.string()),
    links: s.optional(s.array(s.record(s.string(), s.unknown()))),
    _keysMap: {
        merchantCustomerId: "merchant_customer_id",
    },
};
export const vaultResponseCustomerInternalSchema = s.object(vaultResponseCustomerProperties, { additionalProperties: s.json() });
export const vaultResponseCustomerSchema = s.lazySchema(() => s.object({
    ...vaultResponseCustomerProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(22), s.pattern("^[0-9a-zA-Z_-]+$"))),
    merchantCustomerId: s.optional(s.string().check(s.minLength(1), s.maxLength(64), s.pattern("^[0-9a-zA-Z-_.^*$@#]+$"))),
    links: s.optional(s.array(s.record(s.string(), s.unknown())).check(s.maxLength(16))),
}, { additionalProperties: s.json() }));
