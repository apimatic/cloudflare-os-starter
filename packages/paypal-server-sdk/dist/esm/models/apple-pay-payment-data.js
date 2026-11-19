import * as s from "../core/validation/index.js";
const applePayPaymentDataProperties = {
    cryptogram: s.optional(s.string()),
    eciIndicator: s.optional(s.string()),
    emvData: s.optional(s.string()),
    pin: s.optional(s.string()),
    _keysMap: {
        eciIndicator: "eci_indicator",
        emvData: "emv_data",
    },
};
export const applePayPaymentDataInternalSchema = s.object(applePayPaymentDataProperties, { additionalProperties: s.json() });
export const applePayPaymentDataSchema = s.lazySchema(() => s.object({
    ...applePayPaymentDataProperties,
    cryptogram: s.optional(s.string().check(s.minLength(1), s.maxLength(2000), s.pattern("^.*$"))),
    eciIndicator: s.optional(s.string().check(s.minLength(1), s.maxLength(256), s.pattern("^.*$"))),
    emvData: s.optional(s.string().check(s.minLength(1), s.maxLength(2000), s.pattern("^.*$"))),
    pin: s.optional(s.string().check(s.minLength(1), s.maxLength(2000), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=apple-pay-payment-data.js.map