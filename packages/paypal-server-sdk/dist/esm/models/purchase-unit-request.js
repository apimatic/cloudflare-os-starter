import * as s from "../core/validation/index.js";
import { amountWithBreakdownInternalSchema, amountWithBreakdownSchema, } from "./amount-with-breakdown.js";
import { itemRequestInternalSchema, itemRequestSchema } from "./item-request.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
import { paymentInstructionInternalSchema, paymentInstructionSchema, } from "./payment-instruction.js";
import { shippingDetailsInternalSchema, shippingDetailsSchema, } from "./shipping-details.js";
import { supplementaryDataInternalSchema, supplementaryDataSchema, } from "./supplementary-data.js";
const purchaseUnitRequestProperties = {
    referenceId: s.optional(s.string()),
    amount: amountWithBreakdownInternalSchema,
    payee: s.optional(s.lazy(() => payeeBaseInternalSchema)),
    paymentInstruction: s.optional(s.lazy(() => paymentInstructionInternalSchema)),
    description: s.optional(s.string()),
    customId: s.optional(s.string()),
    invoiceId: s.optional(s.string()),
    softDescriptor: s.optional(s.string()),
    items: s.optional(s.array(s.lazy(() => itemRequestInternalSchema))),
    shipping: s.optional(s.lazy(() => shippingDetailsInternalSchema)),
    supplementaryData: s.optional(s.lazy(() => supplementaryDataInternalSchema)),
    _keysMap: {
        referenceId: "reference_id",
        paymentInstruction: "payment_instruction",
        customId: "custom_id",
        invoiceId: "invoice_id",
        softDescriptor: "soft_descriptor",
        supplementaryData: "supplementary_data",
    },
};
export const purchaseUnitRequestInternalSchema = s.object(purchaseUnitRequestProperties, { additionalProperties: s.json() });
export const purchaseUnitRequestSchema = s.lazySchema(() => s.object({
    ...purchaseUnitRequestProperties,
    referenceId: s.optional(s.string().check(s.minLength(1), s.maxLength(256))),
    amount: amountWithBreakdownSchema,
    payee: s.optional(s.lazy(() => payeeBaseSchema)),
    paymentInstruction: s.optional(s.lazy(() => paymentInstructionSchema)),
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(3000))),
    customId: s.optional(s.string().check(s.minLength(1), s.maxLength(255))),
    invoiceId: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    softDescriptor: s.optional(s.string().check(s.minLength(1), s.maxLength(1000))),
    items: s.optional(s.array(s.lazy(() => itemRequestSchema))),
    shipping: s.optional(s.lazy(() => shippingDetailsSchema)),
    supplementaryData: s.optional(s.lazy(() => supplementaryDataSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=purchase-unit-request.js.map