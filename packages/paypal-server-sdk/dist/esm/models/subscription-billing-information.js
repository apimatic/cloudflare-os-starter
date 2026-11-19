import * as s from "../core/validation/index.js";
import { cycleExecutionInternalSchema, cycleExecutionSchema, } from "./cycle-execution.js";
import { failedPaymentDetailsInternalSchema, failedPaymentDetailsSchema, } from "./failed-payment-details.js";
import { lastPaymentDetailsInternalSchema, lastPaymentDetailsSchema, } from "./last-payment-details.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const subscriptionBillingInformationProperties = {
    outstandingBalance: moneyInternalSchema,
    cycleExecutions: s.optional(s.array(s.lazy(() => cycleExecutionInternalSchema))),
    lastPayment: s.optional(s.lazy(() => lastPaymentDetailsInternalSchema)),
    nextBillingTime: s.optional(s.string()),
    finalPaymentTime: s.optional(s.string()),
    failedPaymentsCount: s.int(),
    lastFailedPayment: s.optional(s.lazy(() => failedPaymentDetailsInternalSchema)),
    _keysMap: {
        outstandingBalance: "outstanding_balance",
        cycleExecutions: "cycle_executions",
        lastPayment: "last_payment",
        nextBillingTime: "next_billing_time",
        finalPaymentTime: "final_payment_time",
        failedPaymentsCount: "failed_payments_count",
        lastFailedPayment: "last_failed_payment",
    },
};
export const subscriptionBillingInformationInternalSchema = s.object(subscriptionBillingInformationProperties, {
    additionalProperties: s.json(),
});
export const subscriptionBillingInformationSchema = s.lazySchema(() => s.object({
    ...subscriptionBillingInformationProperties,
    outstandingBalance: moneySchema,
    cycleExecutions: s.optional(s.array(s.lazy(() => cycleExecutionSchema)).check(s.minLength(0), s.maxLength(3))),
    lastPayment: s.optional(s.lazy(() => lastPaymentDetailsSchema)),
    nextBillingTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    finalPaymentTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    failedPaymentsCount: s.int().check(s.gte(0), s.lte(999)),
    lastFailedPayment: s.optional(s.lazy(() => failedPaymentDetailsSchema)),
}, { additionalProperties: s.json() }));
