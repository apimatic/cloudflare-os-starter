import * as s from "../core/validation/index.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardVerificationProcessorResponseSchema, } from "./card-verification-processor-response.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const cardVerificationDetailsProperties = {
    networkTransactionId: s.optional(s.string()),
    date: s.optional(s.string()),
    network: s.optional(s.lazy(() => cardBrandSchema)),
    time: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
    processorResponse: s.optional(s.lazy(() => cardVerificationProcessorResponseSchema)),
    threeDSecure: s.optional(s.record(s.string(), s.unknown())),
    _keysMap: {
        networkTransactionId: "network_transaction_id",
        processorResponse: "processor_response",
        threeDSecure: "three_d_secure",
    },
};
export const cardVerificationDetailsInternalSchema = s.object(cardVerificationDetailsProperties, { additionalProperties: s.json() });
export const cardVerificationDetailsSchema = s.lazySchema(() => s.object({
    ...cardVerificationDetailsProperties,
    networkTransactionId: s.optional(s.string().check(s.minLength(1), s.maxLength(1024), s.pattern("^[a-zA-Z0-9-_@.:&+=*^'~#!$%()]+$"))),
    date: s.optional(s.string().check(s.minLength(4), s.maxLength(4), s.pattern("^[0-9]+$"))),
    time: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    amount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
