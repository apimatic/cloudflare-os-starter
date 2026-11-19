import * as s from "../core/validation/index.js";
import { amountBreakdownInternalSchema, amountBreakdownSchema, } from "./amount-breakdown.js";
const amountWithBreakdownProperties = {
    currencyCode: s.string(),
    value: s.string(),
    breakdown: s.optional(s.lazy(() => amountBreakdownInternalSchema)),
    _keysMap: {
        currencyCode: "currency_code",
    },
};
export const amountWithBreakdownInternalSchema = s.object(amountWithBreakdownProperties, { additionalProperties: s.json() });
export const amountWithBreakdownSchema = s.lazySchema(() => s.object({
    ...amountWithBreakdownProperties,
    currencyCode: s.string().check(s.minLength(3), s.maxLength(3)),
    value: s.string().check(s.maxLength(32), s.pattern("^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$")),
    breakdown: s.optional(s.lazy(() => amountBreakdownSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=amount-with-breakdown.js.map