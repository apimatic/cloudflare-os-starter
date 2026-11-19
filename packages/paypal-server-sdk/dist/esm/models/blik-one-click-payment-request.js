import * as s from "../core/validation/index.js";
const blikOneClickPaymentRequestProperties = {
    authCode: s.optional(s.string()),
    consumerReference: s.string(),
    aliasLabel: s.optional(s.string()),
    aliasKey: s.optional(s.string()),
    _keysMap: {
        authCode: "auth_code",
        consumerReference: "consumer_reference",
        aliasLabel: "alias_label",
        aliasKey: "alias_key",
    },
};
export const blikOneClickPaymentRequestInternalSchema = s.object(blikOneClickPaymentRequestProperties, {
    additionalProperties: s.json(),
});
export const blikOneClickPaymentRequestSchema = s.lazySchema(() => s.object({
    ...blikOneClickPaymentRequestProperties,
    authCode: s.optional(s.string().check(s.minLength(6), s.maxLength(6), s.pattern("^[0-9]{6}$"))),
    consumerReference: s.string().check(s.minLength(3), s.maxLength(64), s.pattern("^[ -~]{3,64}$")),
    aliasLabel: s.optional(s.string().check(s.minLength(8), s.maxLength(35), s.pattern("^[ -~]{8,35}$"))),
    aliasKey: s.optional(s.string().check(s.minLength(1), s.maxLength(19), s.pattern("^[0-9]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=blik-one-click-payment-request.js.map