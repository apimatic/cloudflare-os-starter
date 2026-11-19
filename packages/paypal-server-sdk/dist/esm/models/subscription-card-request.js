import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardTypeSchema } from "./card-type.js";
import { subscriptionsCardAttributesInternalSchema, subscriptionsCardAttributesSchema, } from "./subscriptions-card-attributes.js";
import { subscriptionsCardBrandSchema } from "./subscriptions-card-brand.js";
const subscriptionCardRequestProperties = {
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => subscriptionsCardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    attributes: s.optional(s.lazy(() => subscriptionsCardAttributesInternalSchema)),
    _keysMap: {
        securityCode: "security_code",
        billingAddress: "billing_address",
    },
};
export const subscriptionCardRequestInternalSchema = s.object(subscriptionCardRequestProperties, { additionalProperties: s.json() });
export const subscriptionCardRequestSchema = s.lazySchema(() => s.object({
    ...subscriptionCardRequestProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(300), s.pattern("^.{1,300}$"))),
    number: s.optional(s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    securityCode: s.optional(s.string().check(s.minLength(3), s.maxLength(4), s.pattern("^[0-9]{3,4}$"))),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => subscriptionsCardAttributesSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-card-request.js.map