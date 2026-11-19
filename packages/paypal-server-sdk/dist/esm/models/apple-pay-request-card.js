import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardTypeSchema } from "./card-type.js";
const applePayRequestCardProperties = {
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        billingAddress: "billing_address",
    },
};
export const applePayRequestCardInternalSchema = s.object(applePayRequestCardProperties, { additionalProperties: s.json() });
export const applePayRequestCardSchema = s.lazySchema(() => s.object({
    ...applePayRequestCardProperties,
    billingAddress: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=apple-pay-request-card.js.map