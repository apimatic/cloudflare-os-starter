import * as s from "../core/validation/index.js";
import { amountWithBreakdownInternalSchema, amountWithBreakdownSchema, } from "./amount-with-breakdown.js";
import { itemInternalSchema, itemSchema } from "./item.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
import { paymentCollectionInternalSchema, paymentCollectionSchema, } from "./payment-collection.js";
import { paymentInstructionInternalSchema, paymentInstructionSchema, } from "./payment-instruction.js";
import { shippingWithTrackingDetailsInternalSchema, shippingWithTrackingDetailsSchema, } from "./shipping-with-tracking-details.js";
import { supplementaryDataInternalSchema, supplementaryDataSchema, } from "./supplementary-data.js";
const purchaseUnitProperties = {
    referenceId: s.optional(s.string()),
    amount: s.optional(s.lazy(() => amountWithBreakdownInternalSchema)),
    payee: s.optional(s.lazy(() => payeeBaseInternalSchema)),
    paymentInstruction: s.optional(s.lazy(() => paymentInstructionInternalSchema)),
    description: s.optional(s.string()),
    customId: s.optional(s.string()),
    invoiceId: s.optional(s.string()),
    id: s.optional(s.string()),
    softDescriptor: s.optional(s.string()),
    items: s.optional(s.array(s.lazy(() => itemInternalSchema))),
    shipping: s.optional(s.lazy(() => shippingWithTrackingDetailsInternalSchema)),
    supplementaryData: s.optional(s.lazy(() => supplementaryDataInternalSchema)),
    payments: s.optional(s.lazy(() => paymentCollectionInternalSchema)),
    mostRecentErrors: s.optional(s.array(s.record(s.string(), s.unknown()))),
    _keysMap: {
        referenceId: "reference_id",
        paymentInstruction: "payment_instruction",
        customId: "custom_id",
        invoiceId: "invoice_id",
        softDescriptor: "soft_descriptor",
        supplementaryData: "supplementary_data",
        mostRecentErrors: "most_recent_errors",
    },
};
export const purchaseUnitInternalSchema = s.object(purchaseUnitProperties, { additionalProperties: s.json() });
export const purchaseUnitSchema = s.lazySchema(() => s.object({
    ...purchaseUnitProperties,
    referenceId: s.optional(s.string().check(s.minLength(1), s.maxLength(256))),
    amount: s.optional(s.lazy(() => amountWithBreakdownSchema)),
    payee: s.optional(s.lazy(() => payeeBaseSchema)),
    paymentInstruction: s.optional(s.lazy(() => paymentInstructionSchema)),
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    customId: s.optional(s.string().check(s.minLength(1), s.maxLength(255))),
    invoiceId: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(19))),
    softDescriptor: s.optional(s.string().check(s.minLength(1), s.maxLength(22))),
    items: s.optional(s.array(s.lazy(() => itemSchema))),
    shipping: s.optional(s.lazy(() => shippingWithTrackingDetailsSchema)),
    supplementaryData: s.optional(s.lazy(() => supplementaryDataSchema)),
    payments: s.optional(s.lazy(() => paymentCollectionSchema)),
    mostRecentErrors: s.optional(s.array(s.record(s.string(), s.unknown())).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
