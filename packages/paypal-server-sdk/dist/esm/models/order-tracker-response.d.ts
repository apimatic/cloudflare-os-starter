import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type OrderTrackerItem } from "./order-tracker-item.js";
import { type OrderTrackerStatus } from "./order-tracker-status.js";
/** The tracking response on creation of tracker. */
export type OrderTrackerResponse = {
    /** The tracker id. */
    id?: string;
    /** The status of the item shipment. */
    status?: OrderTrackerStatus;
    /** An array of details of items in the shipment. */
    items?: OrderTrackerItem[];
    /** An array of request-related HATEOAS links. */
    links?: LinkDescription[];
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    createTime?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    updateTime?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderTrackerResponseInternalSchema: Schema<OrderTrackerResponse>;
export declare const orderTrackerResponseSchema: Schema<OrderTrackerResponse>;
