import * as s from "../core/validation/index.js";
import { captureStatusSchema } from "./capture-status.js";
import { subscriptionAmountWithBreakdownInternalSchema, subscriptionAmountWithBreakdownSchema, } from "./subscription-amount-with-breakdown.js";
import { subscriptionPayerNameInternalSchema, subscriptionPayerNameSchema, } from "./subscription-payer-name.js";
const subscriptionTransactionDetailsProperties = {
    status: s.optional(s.lazy(() => captureStatusSchema)),
    id: s.string(),
    amountWithBreakdown: subscriptionAmountWithBreakdownInternalSchema,
    payerName: s.optional(s.lazy(() => subscriptionPayerNameInternalSchema)),
    payerEmail: s.optional(s.string()),
    time: s.string(),
    _keysMap: {
        amountWithBreakdown: "amount_with_breakdown",
        payerName: "payer_name",
        payerEmail: "payer_email",
    },
};
export const subscriptionTransactionDetailsInternalSchema = s.object(subscriptionTransactionDetailsProperties, {
    additionalProperties: s.json(),
});
export const subscriptionTransactionDetailsSchema = s.lazySchema(() => s.object({
    ...subscriptionTransactionDetailsProperties,
    id: s.string().check(s.minLength(3), s.maxLength(50)),
    amountWithBreakdown: subscriptionAmountWithBreakdownSchema,
    payerName: s.optional(s.lazy(() => subscriptionPayerNameSchema)),
    payerEmail: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    time: s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$")),
}, { additionalProperties: s.json() }));
