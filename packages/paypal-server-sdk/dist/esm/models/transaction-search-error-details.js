import * as s from "../core/validation/index.js";
export const transactionSearchErrorDetailsSchema = s.object({
    field: s.optional(s.string()),
    value: s.optional(s.string()),
    location: s.defaulted(s.string(), "body"),
    issue: s.string(),
    description: s.optional(s.string()),
}, { additionalProperties: s.json() });
//# sourceMappingURL=transaction-search-error-details.js.map