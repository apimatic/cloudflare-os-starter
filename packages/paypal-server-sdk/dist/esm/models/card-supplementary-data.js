import * as s from "../core/validation/index.js";
import { level2CardProcessingDataInternalSchema, level2CardProcessingDataSchema, } from "./level2-card-processing-data.js";
import { level3CardProcessingDataInternalSchema, level3CardProcessingDataSchema, } from "./level3-card-processing-data.js";
const cardSupplementaryDataProperties = {
    level2: s.optional(s.lazy(() => level2CardProcessingDataInternalSchema)),
    level3: s.optional(s.lazy(() => level3CardProcessingDataInternalSchema)),
    _keysMap: {
        level2: "level_2",
        level3: "level_3",
    },
};
export const cardSupplementaryDataInternalSchema = s.object(cardSupplementaryDataProperties, { additionalProperties: s.json() });
export const cardSupplementaryDataSchema = s.lazySchema(() => s.object({
    ...cardSupplementaryDataProperties,
    level2: s.optional(s.lazy(() => level2CardProcessingDataSchema)),
    level3: s.optional(s.lazy(() => level3CardProcessingDataSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-supplementary-data.js.map