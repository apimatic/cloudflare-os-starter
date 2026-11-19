import * as s from "../core/validation/index.js";
import { sepaDebitRequestInternalSchema, sepaDebitRequestSchema, } from "./sepa-debit-request.js";
const bankRequestProperties = {
    achDebit: s.optional(s.record(s.string(), s.unknown())),
    sepaDebit: s.optional(s.lazy(() => sepaDebitRequestInternalSchema)),
    _keysMap: {
        achDebit: "ach_debit",
        sepaDebit: "sepa_debit",
    },
};
export const bankRequestInternalSchema = s.object(bankRequestProperties, {
    additionalProperties: s.json(),
});
export const bankRequestSchema = s.lazySchema(() => s.object({
    ...bankRequestProperties,
    sepaDebit: s.optional(s.lazy(() => sepaDebitRequestSchema)),
}, { additionalProperties: s.json() }));
