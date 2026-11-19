import * as s from "../core/validation/index.js";
const exchangeRateProperties = {
    sourceCurrency: s.optional(s.string()),
    targetCurrency: s.optional(s.string()),
    value: s.optional(s.string()),
    _keysMap: {
        sourceCurrency: "source_currency",
        targetCurrency: "target_currency",
    },
};
export const exchangeRateInternalSchema = s.object(exchangeRateProperties, { additionalProperties: s.json() });
export const exchangeRateSchema = s.lazySchema(() => s.object({
    ...exchangeRateProperties,
    sourceCurrency: s.optional(s.string().check(s.minLength(3), s.maxLength(3))),
    targetCurrency: s.optional(s.string().check(s.minLength(3), s.maxLength(3))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=exchange-rate.js.map