import * as s from "../core/validation/index.js";
/** The HTTP method required to make the related call. */
export const LinkHttpMethod = {
    /** The HTTP GET method. */
    Get: "GET",
    /** The HTTP POST method. */
    Post: "POST",
    /** The HTTP PUT method. */
    Put: "PUT",
    /** The HTTP DELETE method. */
    Delete: "DELETE",
    /** The HTTP HEAD method. */
    Head: "HEAD",
    /** The HTTP CONNECT method. */
    Connect: "CONNECT",
    /** The HTTP OPTIONS method. */
    Options: "OPTIONS",
    /** The HTTP PATCH method. */
    Patch: "PATCH",
};
export const linkHttpMethodSchema = s.enumOf(LinkHttpMethod);
