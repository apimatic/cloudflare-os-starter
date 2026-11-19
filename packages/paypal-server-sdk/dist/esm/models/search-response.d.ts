import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type TransactionDetails } from "./transaction-details.js";
/** The search response information. */
export type SearchResponse = {
    /** An array of transaction detail objects. */
    transactionDetails?: TransactionDetails[];
    /** The merchant account number. */
    accountNumber?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    startDate?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    endDate?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    lastRefreshedDatetime?: string;
    /** A zero-relative index of transactions. */
    page?: number;
    /**
     * The total number of transactions as an integer beginning with the specified `page` in the full
     * result and not just in this response.
     */
    totalItems?: number;
    /**
     * The total number of pages, as an `integer`, when the `total_items` is divided into pages of the
     * specified `page_size`.
     */
    totalPages?: number;
    /** An array of request-related [HATEOAS links](/api/rest/responses/#hateoas-links). */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const searchResponseInternalSchema: Schema<SearchResponse>;
export declare const searchResponseSchema: Schema<SearchResponse>;
