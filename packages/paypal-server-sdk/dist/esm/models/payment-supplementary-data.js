import * as s from "../core/validation/index.js";
import { relatedIdentifiersInternalSchema, relatedIdentifiersSchema, } from "./related-identifiers.js";
const paymentSupplementaryDataProperties = {
    relatedIds: s.optional(s.lazy(() => relatedIdentifiersInternalSchema)),
    _keysMap: {
        relatedIds: "related_ids",
    },
};
export const paymentSupplementaryDataInternalSchema = s.object(paymentSupplementaryDataProperties, { additionalProperties: s.json() });
export const paymentSupplementaryDataSchema = s.lazySchema(() => s.object({
    ...paymentSupplementaryDataProperties,
    relatedIds: s.optional(s.lazy(() => relatedIdentifiersSchema)),
}, { additionalProperties: s.json() }));
