import type { EnumSchema } from "../core/validation/schema.js";
/** The status of the item shipment. */
export declare const OrderTrackerStatus: {
    /** The shipment was cancelled and the tracking number no longer applies. */
    readonly Cancelled: "CANCELLED";
    /**
     * The merchant has assigned a tracking number to the items being shipped from the Order. This
     * does not correspond to the carrier's actual status for the shipment. The latest status of the
     * parcel must be retrieved from the carrier.
     */
    readonly Shipped: "SHIPPED";
};
export type OrderTrackerStatus = (typeof OrderTrackerStatus)[keyof typeof OrderTrackerStatus] | (string & {});
export declare const orderTrackerStatusSchema: EnumSchema<OrderTrackerStatus>;
