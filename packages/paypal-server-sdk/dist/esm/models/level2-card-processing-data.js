import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const level2CardProcessingDataProperties = {
    invoiceId: s.optional(s.string()),
    taxTotal: s.optional(s.lazy(() => moneyInternalSchema)),
    _keysMap: {
        invoiceId: "invoice_id",
        taxTotal: "tax_total",
    },
};
export const level2CardProcessingDataInternalSchema = s.object(level2CardProcessingDataProperties, { additionalProperties: s.json() });
export const level2CardProcessingDataSchema = s.lazySchema(() => s.object({
    ...level2CardProcessingDataProperties,
    invoiceId: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern('^[\\w‘\\-.,":;\\!?]*$'))),
    taxTotal: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=level2-card-processing-data.js.map