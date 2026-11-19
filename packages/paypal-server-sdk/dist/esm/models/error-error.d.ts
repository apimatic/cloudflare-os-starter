import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ErrorDetails } from "./error-details.js";
import { type LinkDescription } from "./link-description.js";
/** The error details. */
export type ErrorError = {
    /** The human-readable, unique name of the error. */
    name: string;
    /** The message that describes the error. */
    message: string;
    /** The PayPal internal ID. Used for correlation purposes. */
    debugId: string;
    /** An array of additional details about the error. */
    details?: ErrorDetails[];
    /** An array of request-related [HATEOAS links](/api/rest/responses/#hateoas-links). */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const errorErrorInternalSchema: Schema<ErrorError>;
export declare const errorErrorSchema: Schema<ErrorError>;
