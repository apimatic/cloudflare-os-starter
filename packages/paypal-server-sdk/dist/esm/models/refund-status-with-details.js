import * as s from "../core/validation/index.js";
import { refundStatusDetailsSchema } from "./refund-status-details.js";
import { refundStatusSchema } from "./refund-status.js";
export const refundStatusWithDetailsSchema = s.object({
    status: s.optional(s.lazy(() => refundStatusSchema)),
    statusDetails: s.optional(s.lazy(() => refundStatusDetailsSchema)),
    _keysMap: {
        statusDetails: "status_details",
    },
}, { additionalProperties: s.json() });
