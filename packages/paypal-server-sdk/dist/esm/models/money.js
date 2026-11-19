import * as s from "../core/validation/index.js";
const moneyProperties = {
    currencyCode: s.string(),
    value: s.string(),
    _keysMap: {
        currencyCode: "currency_code",
    },
};
export const moneyInternalSchema = s.object(moneyProperties, {
    additionalProperties: s.json(),
});
export const moneySchema = s.lazySchema(() => s.object({
    ...moneyProperties,
    currencyCode: s.string().check(s.minLength(3), s.maxLength(3)),
    value: s.string().check(s.maxLength(32), s.pattern("^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=money.js.map