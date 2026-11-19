import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
const cardResponseWithBillingAddressProperties = {
    name: s.optional(s.string()),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    expiry: s.optional(s.string()),
    currencyCode: s.optional(s.string()),
    _keysMap: {
        billingAddress: "billing_address",
        currencyCode: "currency_code",
    },
};
export const cardResponseWithBillingAddressInternalSchema = s.object(cardResponseWithBillingAddressProperties, {
    additionalProperties: s.json(),
});
export const cardResponseWithBillingAddressSchema = s.lazySchema(() => s.object({
    ...cardResponseWithBillingAddressProperties,
    name: s.optional(s.string().check(s.minLength(2), s.maxLength(300))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    currencyCode: s.optional(s.string().check(s.minLength(3), s.maxLength(3))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-response-with-billing-address.js.map