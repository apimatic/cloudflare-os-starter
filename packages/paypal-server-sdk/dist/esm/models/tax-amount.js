import * as s from "../core/validation/index.js";
import { moneyTransactionSearchInternalSchema, moneyTransactionSearchSchema, } from "./money-transaction-search.js";
const taxAmountProperties = {
    taxAmount: s.optional(s.lazy(() => moneyTransactionSearchInternalSchema)),
    _keysMap: {
        taxAmount: "tax_amount",
    },
};
export const taxAmountInternalSchema = s.object(taxAmountProperties, {
    additionalProperties: s.json(),
});
export const taxAmountSchema = s.lazySchema(() => s.object({
    ...taxAmountProperties,
    taxAmount: s.optional(s.lazy(() => moneyTransactionSearchSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=tax-amount.js.map