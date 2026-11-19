import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { lineItemInternalSchema, lineItemSchema } from "./line-item.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const level3CardProcessingDataProperties = {
    shippingAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    dutyAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    discountAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    shippingAddress: s.optional(s.lazy(() => addressInternalSchema)),
    shipsFromPostalCode: s.optional(s.string()),
    lineItems: s.optional(s.array(s.lazy(() => lineItemInternalSchema))),
    _keysMap: {
        shippingAmount: "shipping_amount",
        dutyAmount: "duty_amount",
        discountAmount: "discount_amount",
        shippingAddress: "shipping_address",
        shipsFromPostalCode: "ships_from_postal_code",
        lineItems: "line_items",
    },
};
export const level3CardProcessingDataInternalSchema = s.object(level3CardProcessingDataProperties, { additionalProperties: s.json() });
export const level3CardProcessingDataSchema = s.lazySchema(() => s.object({
    ...level3CardProcessingDataProperties,
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    dutyAmount: s.optional(s.lazy(() => moneySchema)),
    discountAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => addressSchema)),
    shipsFromPostalCode: s.optional(s.string().check(s.minLength(1), s.maxLength(60), s.pattern("^[a-zA-Z0-9_'.-]*$"))),
    lineItems: s.optional(s.array(s.lazy(() => lineItemSchema)).check(s.minLength(1), s.maxLength(100))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=level3-card-processing-data.js.map