import * as s from "../core/validation/index.js";
import { cardSupplementaryDataInternalSchema, cardSupplementaryDataSchema, } from "./card-supplementary-data.js";
import { riskSupplementaryDataInternalSchema, riskSupplementaryDataSchema, } from "./risk-supplementary-data.js";
const supplementaryDataProperties = {
    card: s.optional(s.lazy(() => cardSupplementaryDataInternalSchema)),
    risk: s.optional(s.lazy(() => riskSupplementaryDataInternalSchema)),
};
export const supplementaryDataInternalSchema = s.object(supplementaryDataProperties, { additionalProperties: s.json() });
export const supplementaryDataSchema = s.lazySchema(() => s.object({
    ...supplementaryDataProperties,
    card: s.optional(s.lazy(() => cardSupplementaryDataSchema)),
    risk: s.optional(s.lazy(() => riskSupplementaryDataSchema)),
}, { additionalProperties: s.json() }));
