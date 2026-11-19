import * as s from "../core/validation/index.js";
import { captureStatusDetailsSchema } from "./capture-status-details.js";
import { captureStatusSchema } from "./capture-status.js";
import { DisbursementMode, disbursementModeSchema } from "./disbursement-mode.js";
import { linkDescriptionSchema } from "./link-description.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { networkTransactionPaymentsInternalSchema, networkTransactionPaymentsSchema, } from "./network-transaction-payments.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
import { paymentSupplementaryDataInternalSchema, paymentSupplementaryDataSchema, } from "./payment-supplementary-data.js";
import { paymentsProcessorResponseSchema, } from "./payments-processor-response.js";
import { sellerProtectionSchema } from "./seller-protection.js";
import { sellerReceivableBreakdownInternalSchema, sellerReceivableBreakdownSchema, } from "./seller-receivable-breakdown.js";
const capturedPaymentProperties = {
    status: s.optional(s.lazy(() => captureStatusSchema)),
    statusDetails: s.optional(s.lazy(() => captureStatusDetailsSchema)),
    id: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    invoiceId: s.optional(s.string()),
    customId: s.optional(s.string()),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionPaymentsInternalSchema)),
    sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
    finalCapture: s.defaulted(s.boolean(), false),
    sellerReceivableBreakdown: s.optional(s.lazy(() => sellerReceivableBreakdownInternalSchema)),
    disbursementMode: s.defaulted(disbursementModeSchema, DisbursementMode.Instant),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    processorResponse: s.optional(s.lazy(() => paymentsProcessorResponseSchema)),
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
        finalCapture: "final_capture",
        sellerReceivableBreakdown: "seller_receivable_breakdown",
        disbursementMode: "disbursement_mode",
        processorResponse: "processor_response",
        createTime: "create_time",
        updateTime: "update_time",
        supplementaryData: "supplementary_data",
    },
};
export const capturedPaymentInternalSchema = s.object(capturedPaymentProperties, { additionalProperties: s.json() });
export const capturedPaymentSchema = s.lazySchema(() => s.object({
    ...capturedPaymentProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
    customId: s.optional(s.string().check(s.maxLength(255))),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionPaymentsSchema)),
    sellerReceivableBreakdown: s.optional(s.lazy(() => sellerReceivableBreakdownSchema)),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    supplementaryData: s.optional(s.lazy(() => paymentSupplementaryDataSchema)),
    payee: s.optional(s.lazy(() => payeeBaseSchema)),
}, { additionalProperties: s.json() }));
