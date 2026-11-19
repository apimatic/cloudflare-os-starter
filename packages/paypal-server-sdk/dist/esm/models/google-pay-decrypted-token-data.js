import * as s from "../core/validation/index.js";
import { googlePayAuthenticationMethodSchema, } from "./google-pay-authentication-method.js";
import { googlePayCardInternalSchema, googlePayCardSchema } from "./google-pay-card.js";
import { googlePayPaymentMethodSchema } from "./google-pay-payment-method.js";
const googlePayDecryptedTokenDataProperties = {
    messageId: s.optional(s.string()),
    messageExpiration: s.optional(s.string()),
    paymentMethod: googlePayPaymentMethodSchema,
    card: googlePayCardInternalSchema,
    authenticationMethod: googlePayAuthenticationMethodSchema,
    cryptogram: s.optional(s.string()),
    eciIndicator: s.optional(s.string()),
    _keysMap: {
        messageId: "message_id",
        messageExpiration: "message_expiration",
        paymentMethod: "payment_method",
        authenticationMethod: "authentication_method",
        eciIndicator: "eci_indicator",
    },
};
export const googlePayDecryptedTokenDataInternalSchema = s.object(googlePayDecryptedTokenDataProperties, {
    additionalProperties: s.json(),
});
export const googlePayDecryptedTokenDataSchema = s.lazySchema(() => s.object({
    ...googlePayDecryptedTokenDataProperties,
    messageId: s.optional(s.string().check(s.minLength(1), s.maxLength(250), s.pattern("^.*$"))),
    messageExpiration: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("\\d{13}"))),
    card: googlePayCardSchema,
    cryptogram: s.optional(s.string().check(s.minLength(1), s.maxLength(2000))),
    eciIndicator: s.optional(s.string().check(s.minLength(1), s.maxLength(256), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=google-pay-decrypted-token-data.js.map