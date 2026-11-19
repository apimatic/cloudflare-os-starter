import * as s from "../core/validation/index.js";
import { participantMetadataInternalSchema, participantMetadataSchema, } from "./participant-metadata.js";
const riskSupplementaryDataProperties = {
    customer: s.optional(s.lazy(() => participantMetadataInternalSchema)),
};
export const riskSupplementaryDataInternalSchema = s.object(riskSupplementaryDataProperties, { additionalProperties: s.json() });
export const riskSupplementaryDataSchema = s.lazySchema(() => s.object({
    ...riskSupplementaryDataProperties,
    customer: s.optional(s.lazy(() => participantMetadataSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=risk-supplementary-data.js.map