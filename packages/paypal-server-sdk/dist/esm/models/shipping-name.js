import * as s from "../core/validation/index.js";
const shippingNameProperties = {
    fullName: s.optional(s.string()),
    _keysMap: {
        fullName: "full_name",
    },
};
export const shippingNameInternalSchema = s.object(shippingNameProperties, { additionalProperties: s.json() });
export const shippingNameSchema = s.lazySchema(() => s.object({
    ...shippingNameProperties,
    fullName: s.optional(s.string().check(s.maxLength(300))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=shipping-name.js.map