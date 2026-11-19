import * as s from "../core/validation/index.js";
import { authorizationStatusDetailsSchema, } from "./authorization-status-details.js";
import { authorizationStatusSchema } from "./authorization-status.js";
export const authorizationStatusWithDetailsSchema = s.object({
    status: s.optional(s.lazy(() => authorizationStatusSchema)),
    statusDetails: s.optional(s.lazy(() => authorizationStatusDetailsSchema)),
    _keysMap: {
        statusDetails: "status_details",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=authorization-status-with-details.js.map