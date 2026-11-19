import type { EnumSchema } from "../core/validation/schema.js";
/** The HTTP method required to make the related call. */
export declare const LinkHttpMethodTransactionSearch: {
    readonly Get: "GET";
    readonly Post: "POST";
    readonly Put: "PUT";
    readonly Delete: "DELETE";
    readonly Head: "HEAD";
    readonly Connect: "CONNECT";
    readonly Options: "OPTIONS";
    readonly Patch: "PATCH";
};
export type LinkHttpMethodTransactionSearch = (typeof LinkHttpMethodTransactionSearch)[keyof typeof LinkHttpMethodTransactionSearch] | (string & {});
export declare const linkHttpMethodTransactionSearchSchema: EnumSchema<LinkHttpMethodTransactionSearch>;
