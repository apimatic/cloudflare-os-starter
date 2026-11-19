import * as s from "../core/validation/index.js";
import { authorizationIncompleteReasonSchema, } from "./authorization-incomplete-reason.js";
export const authorizationStatusDetailsSchema = s.object({
    reason: s.optional(s.lazy(() => authorizationIncompleteReasonSchema)),
}, { additionalProperties: s.json() });
//# sourceMappingURL=authorization-status-details.js.map