import * as s from "../core/validation/index.js";
import { refundIncompleteReasonSchema } from "./refund-incomplete-reason.js";
export const refundStatusDetailsSchema = s.object({
    reason: s.optional(s.lazy(() => refundIncompleteReasonSchema)),
}, { additionalProperties: s.json() });
