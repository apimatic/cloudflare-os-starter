import * as s from "../core/validation/index.js";
import { moneyTransactionSearchInternalSchema, moneyTransactionSearchSchema, } from "./money-transaction-search.js";
const balanceInformationProperties = {
    currency: s.string(),
    primary: s.optional(s.boolean()),
    totalBalance: moneyTransactionSearchInternalSchema,
    availableBalance: s.optional(s.lazy(() => moneyTransactionSearchInternalSchema)),
    withheldBalance: s.optional(s.lazy(() => moneyTransactionSearchInternalSchema)),
    _keysMap: {
        totalBalance: "total_balance",
        availableBalance: "available_balance",
        withheldBalance: "withheld_balance",
    },
};
export const balanceInformationInternalSchema = s.object(balanceInformationProperties, { additionalProperties: s.json() });
export const balanceInformationSchema = s.lazySchema(() => s.object({
    ...balanceInformationProperties,
    currency: s.string().check(s.minLength(3), s.maxLength(3)),
    totalBalance: moneyTransactionSearchSchema,
    availableBalance: s.optional(s.lazy(() => moneyTransactionSearchSchema)),
    withheldBalance: s.optional(s.lazy(() => moneyTransactionSearchSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=balance-information.js.map