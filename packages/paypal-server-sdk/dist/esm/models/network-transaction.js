import * as s from "../core/validation/index.js";
import { cardBrandSchema } from "./card-brand.js";
const networkTransactionProperties = {
    id: s.optional(s.string()),
    date: s.optional(s.string()),
    network: s.optional(s.lazy(() => cardBrandSchema)),
    acquirerReferenceNumber: s.optional(s.string()),
    _keysMap: {
        acquirerReferenceNumber: "acquirer_reference_number",
    },
};
export const networkTransactionInternalSchema = s.object(networkTransactionProperties, { additionalProperties: s.json() });
export const networkTransactionSchema = s.lazySchema(() => s.object({
    ...networkTransactionProperties,
    id: s.optional(s.string().check(s.minLength(9), s.maxLength(36), s.pattern("^[a-zA-Z0-9-_@.:&+=*^'~#!$%()]+$"))),
    date: s.optional(s.string().check(s.minLength(4), s.maxLength(4), s.pattern("^[0-9]+$"))),
    acquirerReferenceNumber: s.optional(s.string().check(s.minLength(1), s.maxLength(36), s.pattern("^[a-zA-Z0-9]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=network-transaction.js.map