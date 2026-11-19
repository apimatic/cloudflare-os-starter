import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
import { refundStatusDetailsSchema } from "./refund-status-details.js";
import { refundStatusSchema } from "./refund-status.js";
import { sellerPayableBreakdownInternalSchema, sellerPayableBreakdownSchema, } from "./seller-payable-breakdown.js";
const refundProperties = {
    status: s.optional(s.lazy(() => refundStatusSchema)),
    statusDetails: s.optional(s.lazy(() => refundStatusDetailsSchema)),
    id: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    invoiceId: s.optional(s.string()),
    customId: s.optional(s.string()),
    acquirerReferenceNumber: s.optional(s.string()),
    noteToPayer: s.optional(s.string()),
    sellerPayableBreakdown: s.optional(s.lazy(() => sellerPayableBreakdownInternalSchema)),
    payer: s.optional(s.lazy(() => payeeBaseInternalSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    _keysMap: {
        statusDetails: "status_details",
        invoiceId: "invoice_id",
        customId: "custom_id",
        acquirerReferenceNumber: "acquirer_reference_number",
        noteToPayer: "note_to_payer",
        sellerPayableBreakdown: "seller_payable_breakdown",
        createTime: "create_time",
        updateTime: "update_time",
    },
};
export const refundInternalSchema = s.object(refundProperties, {
    additionalProperties: s.json(),
});
export const refundSchema = s.lazySchema(() => s.object({
    ...refundProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
    customId: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[A-Za-z0-9-_.,]*$"))),
    acquirerReferenceNumber: s.optional(s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[a-zA-Z0-9]+$"))),
    sellerPayableBreakdown: s.optional(s.lazy(() => sellerPayableBreakdownSchema)),
    payer: s.optional(s.lazy(() => payeeBaseSchema)),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
