import * as s from "../core/validation/index.js";
const checkoutOptionProperties = {
    checkoutOptionName: s.optional(s.string()),
    checkoutOptionValue: s.optional(s.string()),
    _keysMap: {
        checkoutOptionName: "checkout_option_name",
        checkoutOptionValue: "checkout_option_value",
    },
};
export const checkoutOptionInternalSchema = s.object(checkoutOptionProperties, { additionalProperties: s.json() });
export const checkoutOptionSchema = s.lazySchema(() => s.object({
    ...checkoutOptionProperties,
    checkoutOptionName: s.optional(s.string().check(s.minLength(1), s.maxLength(200), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    checkoutOptionValue: s.optional(s.string().check(s.minLength(1), s.maxLength(200), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=checkout-option.js.map