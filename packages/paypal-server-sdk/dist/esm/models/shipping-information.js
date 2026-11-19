import * as s from "../core/validation/index.js";
import { simplePostalAddressCoarseGrainedInternalSchema, simplePostalAddressCoarseGrainedSchema, } from "./simple-postal-address-coarse-grained.js";
const shippingInformationProperties = {
    name: s.optional(s.string()),
    method: s.optional(s.string()),
    address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedInternalSchema)),
    secondaryShippingAddress: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedInternalSchema)),
    _keysMap: {
        secondaryShippingAddress: "secondary_shipping_address",
    },
};
export const shippingInformationInternalSchema = s.object(shippingInformationProperties, { additionalProperties: s.json() });
export const shippingInformationSchema = s.lazySchema(() => s.object({
    ...shippingInformationProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(500), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    method: s.optional(s.string().check(s.minLength(1), s.maxLength(500), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
    secondaryShippingAddress: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=shipping-information.js.map