import * as s from "../core/validation/index.js";
import { orderTrackerItemInternalSchema, orderTrackerItemSchema, } from "./order-tracker-item.js";
import { shipmentCarrierSchema } from "./shipment-carrier.js";
const orderTrackerRequestProperties = {
    trackingNumber: s.optional(s.string()),
    carrier: s.optional(s.lazy(() => shipmentCarrierSchema)),
    carrierNameOther: s.optional(s.string()),
    captureId: s.string(),
    notifyPayer: s.defaulted(s.boolean(), false),
    items: s.optional(s.array(s.lazy(() => orderTrackerItemInternalSchema))),
    _keysMap: {
        trackingNumber: "tracking_number",
        carrierNameOther: "carrier_name_other",
        captureId: "capture_id",
        notifyPayer: "notify_payer",
    },
};
export const orderTrackerRequestInternalSchema = s.object(orderTrackerRequestProperties, { additionalProperties: s.json() });
export const orderTrackerRequestSchema = s.lazySchema(() => s.object({
    ...orderTrackerRequestProperties,
    trackingNumber: s.optional(s.string().check(s.minLength(1), s.maxLength(64))),
    carrierNameOther: s.optional(s.string().check(s.minLength(1), s.maxLength(64))),
    captureId: s.string().check(s.minLength(1), s.maxLength(50), s.pattern("^[a-zA-Z0-9]*$")),
    items: s.optional(s.array(s.lazy(() => orderTrackerItemSchema))),
}, { additionalProperties: s.json() }));
