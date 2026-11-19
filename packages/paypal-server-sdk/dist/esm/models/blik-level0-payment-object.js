import * as s from "../core/validation/index.js";
const blikLevel0PaymentObjectProperties = {
    authCode: s.string(),
    _keysMap: {
        authCode: "auth_code",
    },
};
export const blikLevel0PaymentObjectInternalSchema = s.object(blikLevel0PaymentObjectProperties, { additionalProperties: s.json() });
export const blikLevel0PaymentObjectSchema = s.lazySchema(() => s.object({
    ...blikLevel0PaymentObjectProperties,
    authCode: s.string().check(s.minLength(6), s.maxLength(6), s.pattern("^[0-9]{6}$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=blik-level0-payment-object.js.map