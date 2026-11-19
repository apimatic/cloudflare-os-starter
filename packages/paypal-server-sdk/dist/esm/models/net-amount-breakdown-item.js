import * as s from "../core/validation/index.js";
import { exchangeRateInternalSchema, exchangeRateSchema } from "./exchange-rate.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const netAmountBreakdownItemProperties = {
    payableAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    convertedAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    exchangeRate: s.optional(s.lazy(() => exchangeRateInternalSchema)),
    _keysMap: {
        payableAmount: "payable_amount",
        convertedAmount: "converted_amount",
        exchangeRate: "exchange_rate",
    },
};
export const netAmountBreakdownItemInternalSchema = s.object(netAmountBreakdownItemProperties, { additionalProperties: s.json() });
export const netAmountBreakdownItemSchema = s.lazySchema(() => s.object({
    ...netAmountBreakdownItemProperties,
    payableAmount: s.optional(s.lazy(() => moneySchema)),
    convertedAmount: s.optional(s.lazy(() => moneySchema)),
    exchangeRate: s.optional(s.lazy(() => exchangeRateSchema)),
}, { additionalProperties: s.json() }));
