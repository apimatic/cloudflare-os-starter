import * as s from "../core/validation/index.js";
const moneyTransactionSearchProperties = {
    currencyCode: s.string(),
    value: s.string(),
    _keysMap: {
        currencyCode: "currency_code",
    },
};
export const moneyTransactionSearchInternalSchema = s.object(moneyTransactionSearchProperties, { additionalProperties: s.json() });
export const moneyTransactionSearchSchema = s.lazySchema(() => s.object({
    ...moneyTransactionSearchProperties,
    currencyCode: s.string().check(s.minLength(3), s.maxLength(3)),
    value: s.string().check(s.maxLength(32), s.pattern("^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=money-transaction-search.js.map