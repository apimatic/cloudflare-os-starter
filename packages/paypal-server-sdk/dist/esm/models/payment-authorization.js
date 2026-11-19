import * as s from "../core/validation/index.js";
import { authorizationStatusDetailsSchema, } from "./authorization-status-details.js";
import { authorizationStatusSchema } from "./authorization-status.js";
import { linkDescriptionSchema } from "./link-description.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { networkTransactionPaymentsInternalSchema, networkTransactionPaymentsSchema, } from "./network-transaction-payments.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
import { paymentSupplementaryDataInternalSchema, paymentSupplementaryDataSchema, } from "./payment-supplementary-data.js";
import { sellerProtectionSchema } from "./seller-protection.js";
const paymentAuthorizationProperties = {
    status: s.optional(s.lazy(() => authorizationStatusSchema)),
    statusDetails: s.optional(s.lazy(() => authorizationStatusDetailsSchema)),
    id: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    invoiceId: s.optional(s.string()),
    customId: s.optional(s.string()),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionPaymentsInternalSchema)),
    sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
    expirationTime: s.optional(s.string()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    supplementaryData: s.optional(s.lazy(() => paymentSupplementaryDataInternalSchema)),
    payee: s.optional(s.lazy(() => payeeBaseInternalSchema)),
    _keysMap: {
        statusDetails: "status_details",
        invoiceId: "invoice_id",
        customId: "custom_id",
        networkTransactionReference: "network_transaction_reference",
        sellerProtection: "seller_protection",
        expirationTime: "expiration_time",
        createTime: "create_time",
        updateTime: "update_time",
        supplementaryData: "supplementary_data",
    },
};
export const paymentAuthorizationInternalSchema = s.object(paymentAuthorizationProperties, { additionalProperties: s.json() });
export const paymentAuthorizationSchema = s.lazySchema(() => s.object({
    ...paymentAuthorizationProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
    customId: s.optional(s.string().check(s.maxLength(255))),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionPaymentsSchema)),
    expirationTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    supplementaryData: s.optional(s.lazy(() => paymentSupplementaryDataSchema)),
    payee: s.optional(s.lazy(() => payeeBaseSchema)),
}, { additionalProperties: s.json() }));
