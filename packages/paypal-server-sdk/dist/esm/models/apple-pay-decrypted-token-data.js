import * as s from "../core/validation/index.js";
import { applePayPaymentDataTypeSchema, } from "./apple-pay-payment-data-type.js";
import { applePayPaymentDataInternalSchema, applePayPaymentDataSchema, } from "./apple-pay-payment-data.js";
import { applePayTokenizedCardInternalSchema, applePayTokenizedCardSchema, } from "./apple-pay-tokenized-card.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const applePayDecryptedTokenDataProperties = {
    transactionAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    tokenizedCard: applePayTokenizedCardInternalSchema,
    deviceManufacturerId: s.optional(s.string()),
    paymentDataType: s.optional(s.lazy(() => applePayPaymentDataTypeSchema)),
    paymentData: s.optional(s.lazy(() => applePayPaymentDataInternalSchema)),
    _keysMap: {
        transactionAmount: "transaction_amount",
        tokenizedCard: "tokenized_card",
        deviceManufacturerId: "device_manufacturer_id",
        paymentDataType: "payment_data_type",
        paymentData: "payment_data",
    },
};
export const applePayDecryptedTokenDataInternalSchema = s.object(applePayDecryptedTokenDataProperties, {
    additionalProperties: s.json(),
});
export const applePayDecryptedTokenDataSchema = s.lazySchema(() => s.object({
    ...applePayDecryptedTokenDataProperties,
    transactionAmount: s.optional(s.lazy(() => moneySchema)),
    tokenizedCard: applePayTokenizedCardSchema,
    deviceManufacturerId: s.optional(s.string().check(s.minLength(1), s.maxLength(2000), s.pattern("^.*$"))),
    paymentData: s.optional(s.lazy(() => applePayPaymentDataSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=apple-pay-decrypted-token-data.js.map