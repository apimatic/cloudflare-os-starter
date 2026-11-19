import * as s from "../core/validation/index.js";
import { blikOneClickPaymentObjectInternalSchema, blikOneClickPaymentObjectSchema, } from "./blik-one-click-payment-object.js";
const blikPaymentObjectProperties = {
    name: s.optional(s.string()),
    countryCode: s.optional(s.string()),
    email: s.optional(s.string()),
    oneClick: s.optional(s.lazy(() => blikOneClickPaymentObjectInternalSchema)),
    _keysMap: {
        countryCode: "country_code",
        oneClick: "one_click",
    },
};
export const blikPaymentObjectInternalSchema = s.object(blikPaymentObjectProperties, { additionalProperties: s.json() });
export const blikPaymentObjectSchema = s.lazySchema(() => s.object({
    ...blikPaymentObjectProperties,
    name: s.optional(s.string().check(s.minLength(3), s.maxLength(300))),
    countryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    email: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    oneClick: s.optional(s.lazy(() => blikOneClickPaymentObjectSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=blik-payment-object.js.map