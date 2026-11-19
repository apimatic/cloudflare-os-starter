import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { reasonCodeSchema } from "./reason-code.js";
const failedPaymentDetailsProperties = {
    amount: moneyInternalSchema,
    time: s.string(),
    reasonCode: s.optional(s.lazy(() => reasonCodeSchema)),
    nextPaymentRetryTime: s.optional(s.string()),
    _keysMap: {
        reasonCode: "reason_code",
        nextPaymentRetryTime: "next_payment_retry_time",
    },
};
export const failedPaymentDetailsInternalSchema = s.object(failedPaymentDetailsProperties, { additionalProperties: s.json() });
export const failedPaymentDetailsSchema = s.lazySchema(() => s.object({
    ...failedPaymentDetailsProperties,
    amount: moneySchema,
    time: s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$")),
    nextPaymentRetryTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=failed-payment-details.js.map