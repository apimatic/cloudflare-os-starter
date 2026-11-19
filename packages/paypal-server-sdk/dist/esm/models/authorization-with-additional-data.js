import * as s from "../core/validation/index.js";
import { authorizationStatusDetailsSchema, } from "./authorization-status-details.js";
import { authorizationStatusSchema } from "./authorization-status.js";
import { linkDescriptionSchema } from "./link-description.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { networkTransactionInternalSchema, networkTransactionSchema, } from "./network-transaction.js";
import { processorResponseSchema } from "./processor-response.js";
import { sellerProtectionSchema } from "./seller-protection.js";
const authorizationWithAdditionalDataProperties = {
    status: s.optional(s.lazy(() => authorizationStatusSchema)),
    statusDetails: s.optional(s.lazy(() => authorizationStatusDetailsSchema)),
    id: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    invoiceId: s.optional(s.string()),
    customId: s.optional(s.string()),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionInternalSchema)),
    sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
    expirationTime: s.optional(s.string()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    processorResponse: s.optional(s.lazy(() => processorResponseSchema)),
    _keysMap: {
        statusDetails: "status_details",
        invoiceId: "invoice_id",
        customId: "custom_id",
        networkTransactionReference: "network_transaction_reference",
        sellerProtection: "seller_protection",
        expirationTime: "expiration_time",
        createTime: "create_time",
        updateTime: "update_time",
        processorResponse: "processor_response",
    },
};
export const authorizationWithAdditionalDataInternalSchema = s.object(authorizationWithAdditionalDataProperties, {
    additionalProperties: s.json(),
});
export const authorizationWithAdditionalDataSchema = s.lazySchema(() => s.object({
    ...authorizationWithAdditionalDataProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
    customId: s.optional(s.string().check(s.maxLength(255))),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
    expirationTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
