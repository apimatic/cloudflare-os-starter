import * as s from "../core/validation/index.js";
const payerBasePaymentMethodTokensProperties = {
    emailAddress: s.optional(s.string()),
    payerId: s.optional(s.string()),
    _keysMap: {
        emailAddress: "email_address",
        payerId: "payer_id",
    },
};
export const payerBasePaymentMethodTokensInternalSchema = s.object(payerBasePaymentMethodTokensProperties, {
    additionalProperties: s.json(),
});
export const payerBasePaymentMethodTokensSchema = s.lazySchema(() => s.object({
    ...payerBasePaymentMethodTokensProperties,
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    payerId: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("^[2-9A-HJ-NP-Z]{13}$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payer-base-payment-method-tokens.js.map