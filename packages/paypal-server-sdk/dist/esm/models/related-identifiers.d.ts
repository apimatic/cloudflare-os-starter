import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Identifiers related to a specific resource. */
export type RelatedIdentifiers = {
    /** Order ID related to the resource. */
    orderId?: string;
    /** Authorization ID related to the resource. */
    authorizationId?: string;
    /** Capture ID related to the resource. */
    captureId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const relatedIdentifiersInternalSchema: Schema<RelatedIdentifiers>;
export declare const relatedIdentifiersSchema: Schema<RelatedIdentifiers>;
