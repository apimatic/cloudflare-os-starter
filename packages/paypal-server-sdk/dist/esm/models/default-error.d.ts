import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type TransactionSearchErrorDetails } from "./transaction-search-error-details.js";
/** The error details. */
export type DefaultError = {
    /** The human-readable, unique name of the error. */
    name: string;
    /** The message that describes the error. */
    message: string;
    /** The PayPal internal ID. Used for correlation purposes. */
    debugId: string;
    /**
     * The information link, or URI, that shows detailed information about this error for the
     * developer.
     */
    informationLink?: string;
    /** An array of additional details about the error. */
    details?: TransactionSearchErrorDetails[];
    /**
     * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const defaultErrorSchema: Schema<DefaultError>;
