import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { refundPaymentInstructionInternalSchema, refundPaymentInstructionSchema, } from "./refund-payment-instruction.js";
const refundRequestProperties = {
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    customId: s.optional(s.string()),
    invoiceId: s.optional(s.string()),
    noteToPayer: s.optional(s.string()),
    paymentInstruction: s.optional(s.lazy(() => refundPaymentInstructionInternalSchema)),
    _keysMap: {
        customId: "custom_id",
        invoiceId: "invoice_id",
        noteToPayer: "note_to_payer",
        paymentInstruction: "payment_instruction",
    },
};
export const refundRequestInternalSchema = s.object(refundRequestProperties, { additionalProperties: s.json() });
export const refundRequestSchema = s.lazySchema(() => s.object({
    ...refundRequestProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
    customId: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    invoiceId: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    noteToPayer: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^.*$"))),
    paymentInstruction: s.optional(s.lazy(() => refundPaymentInstructionSchema)),
}, { additionalProperties: s.json() }));
