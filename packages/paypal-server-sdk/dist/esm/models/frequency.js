import * as s from "../core/validation/index.js";
import { intervalUnitSchema } from "./interval-unit.js";
const frequencyProperties = {
    intervalUnit: intervalUnitSchema,
    intervalCount: s.defaulted(s.int(), 1),
    _keysMap: {
        intervalUnit: "interval_unit",
        intervalCount: "interval_count",
    },
};
export const frequencyInternalSchema = s.object(frequencyProperties, {
    additionalProperties: s.json(),
});
export const frequencySchema = s.lazySchema(() => s.object({
    ...frequencyProperties,
    intervalCount: s.defaulted(s.int().check(s.gte(1), s.lte(365)), 1),
}, { additionalProperties: s.json() }));
