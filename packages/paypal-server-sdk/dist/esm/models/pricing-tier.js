import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const pricingTierProperties = {
    startingQuantity: s.string(),
    endingQuantity: s.optional(s.string()),
    amount: moneyInternalSchema,
    _keysMap: {
        startingQuantity: "starting_quantity",
        endingQuantity: "ending_quantity",
    },
};
export const pricingTierInternalSchema = s.object(pricingTierProperties, {
    additionalProperties: s.json(),
});
export const pricingTierSchema = s.lazySchema(() => s.object({
    ...pricingTierProperties,
    startingQuantity: s
        .string()
        .check(s.minLength(1), s.maxLength(32), s.pattern("^([0-9]+|([0-9]+)?[.][0-9]+)$")),
    endingQuantity: s.optional(s.string().check(s.minLength(1), s.maxLength(32), s.pattern("^([0-9]+|([0-9]+)?[.][0-9]+)$"))),
    amount: moneySchema,
}, { additionalProperties: s.json() }));
