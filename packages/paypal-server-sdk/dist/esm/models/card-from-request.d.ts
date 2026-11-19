import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Representation of card details as received in the request. */
export type CardFromRequest = {
    /**
     * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6).
     */
    expiry?: string;
    /** The last digits of the payment card. */
    lastDigits?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardFromRequestInternalSchema: Schema<CardFromRequest>;
export declare const cardFromRequestSchema: Schema<CardFromRequest>;
