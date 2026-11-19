import * as s from "../core/validation/index.js";
import { capturePaymentInstructionInternalSchema, capturePaymentInstructionSchema, } from "./capture-payment-instruction.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const captureRequestProperties = {
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    invoiceId: s.optional(s.string()),
    finalCapture: s.defaulted(s.boolean(), false),
    paymentInstruction: s.optional(s.lazy(() => capturePaymentInstructionInternalSchema)),
    noteToPayer: s.optional(s.string()),
    softDescriptor: s.optional(s.string()),
    _keysMap: {
        invoiceId: "invoice_id",
        finalCapture: "final_capture",
        paymentInstruction: "payment_instruction",
        noteToPayer: "note_to_payer",
        softDescriptor: "soft_descriptor",
    },
};
export const captureRequestInternalSchema = s.object(captureRequestProperties, { additionalProperties: s.json() });
export const captureRequestSchema = s.lazySchema(() => s.object({
    ...captureRequestProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
    invoiceId: s.optional(s.string().check(s.maxLength(127))),
    paymentInstruction: s.optional(s.lazy(() => capturePaymentInstructionSchema)),
    noteToPayer: s.optional(s.string().check(s.maxLength(255))),
    softDescriptor: s.optional(s.string().check(s.maxLength(22))),
}, { additionalProperties: s.json() }));
