import * as s from "../core/validation/index.js";
import { cardBrandSchema } from "./card-brand.js";
const networkTransactionReferenceEntityProperties = {
    id: s.string(),
    date: s.optional(s.string()),
    network: s.optional(s.lazy(() => cardBrandSchema)),
    time: s.optional(s.string()),
};
export const networkTransactionReferenceEntityInternalSchema = s.object(networkTransactionReferenceEntityProperties, {
    additionalProperties: s.json(),
});
export const networkTransactionReferenceEntitySchema = s.lazySchema(() => s.object({
    ...networkTransactionReferenceEntityProperties,
    id: s.string().check(s.minLength(9), s.maxLength(36), s.pattern("^[a-zA-Z0-9-_@.:&+=*^'~#!$%()]+$")),
    date: s.optional(s.string().check(s.minLength(4), s.maxLength(4), s.pattern("^[0-9]+$"))),
    time: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
