import type { EnumSchema } from "../core/validation/schema.js";
/** The HTTP method required to make the related call. */
export declare const LinkHttpMethod: {
    /** The HTTP GET method. */
    readonly Get: "GET";
    /** The HTTP POST method. */
    readonly Post: "POST";
    /** The HTTP PUT method. */
    readonly Put: "PUT";
    /** The HTTP DELETE method. */
    readonly Delete: "DELETE";
    /** The HTTP HEAD method. */
    readonly Head: "HEAD";
    /** The HTTP CONNECT method. */
    readonly Connect: "CONNECT";
    /** The HTTP OPTIONS method. */
    readonly Options: "OPTIONS";
    /** The HTTP PATCH method. */
    readonly Patch: "PATCH";
};
export type LinkHttpMethod = (typeof LinkHttpMethod)[keyof typeof LinkHttpMethod] | (string & {});
export declare const linkHttpMethodSchema: EnumSchema<LinkHttpMethod>;
