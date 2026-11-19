import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type RelatedIdentifiers } from "./related-identifiers.js";
/** The supplementary data. */
export type PaymentSupplementaryData = {
    /** Identifiers related to a specific resource. */
    relatedIds?: RelatedIdentifiers;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentSupplementaryDataInternalSchema: Schema<PaymentSupplementaryData>;
export declare const paymentSupplementaryDataSchema: Schema<PaymentSupplementaryData>;
