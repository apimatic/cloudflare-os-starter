import * as s from "../core/validation/index.js";
import { captureStatusDetailsSchema } from "./capture-status-details.js";
import { captureStatusSchema } from "./capture-status.js";
export const captureStatusWithDetailsSchema = s.object({
    status: s.optional(s.lazy(() => captureStatusSchema)),
    statusDetails: s.optional(s.lazy(() => captureStatusDetailsSchema)),
    _keysMap: {
        statusDetails: "status_details",
    },
}, { additionalProperties: s.json() });
