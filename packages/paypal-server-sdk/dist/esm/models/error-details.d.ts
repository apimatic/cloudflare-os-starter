import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
/** The error details. Required for client-side `4XX` errors. */
export type ErrorDetails = {
    /**
     * The field that caused the error. If this field is in the body, set this value to the field's
     * JSON pointer value. Required for client-side errors.
     */
    field?: string;
    /** The value of the field that caused the error. */
    value?: string;
    /**
     * The location of the field that caused the error. Value is `body`, `path`, or `query`.
     *
     * @default "body"
     */
    location?: string;
    /** The unique, fine-grained application-level error code. */
    issue: string;
    /**
     * An array of request-related [HATEOAS links](/api/rest/responses/#hateoas-links) that are either
     * relevant to the issue by providing additional information or offering potential resolutions.
     */
    links?: LinkDescription[];
    /**
     * The human-readable description for an issue. The description can change over the lifetime of an
     * API, so clients must not depend on this value.
     */
    description?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const errorDetailsInternalSchema: Schema<ErrorDetails>;
export declare const errorDetailsSchema: Schema<ErrorDetails>;
