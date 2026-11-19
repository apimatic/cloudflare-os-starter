import * as s from "../core/validation/index.js";
const blikOneClickPaymentObjectProperties = {
    consumerReference: s.optional(s.string()),
    _keysMap: {
        consumerReference: "consumer_reference",
    },
};
export const blikOneClickPaymentObjectInternalSchema = s.object(blikOneClickPaymentObjectProperties, {
    additionalProperties: s.json(),
});
export const blikOneClickPaymentObjectSchema = s.lazySchema(() => s.object({
    ...blikOneClickPaymentObjectProperties,
    consumerReference: s.optional(s.string().check(s.minLength(3), s.maxLength(64), s.pattern("^[ -~]{3,64}$"))),
}, { additionalProperties: s.json() }));
