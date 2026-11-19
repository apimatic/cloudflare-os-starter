import * as s from "../core/validation/index.js";
import { captureIncompleteReasonSchema } from "./capture-incomplete-reason.js";
export const captureStatusDetailsSchema = s.object({
    reason: s.optional(s.lazy(() => captureIncompleteReasonSchema)),
}, { additionalProperties: s.json() });
//# sourceMappingURL=capture-status-details.js.map