import * as s from "../core/validation/index.js";
/** The HTTP method required to make the related call. */
export const LinkHttpMethodTransactionSearch = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
    Head: "HEAD",
    Connect: "CONNECT",
    Options: "OPTIONS",
    Patch: "PATCH",
};
export const linkHttpMethodTransactionSearchSchema = s.enumOf(LinkHttpMethodTransactionSearch);
