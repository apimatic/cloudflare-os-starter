import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type RefundIncompleteReason } from "./refund-incomplete-reason.js";
/** The details of the refund status. */
export type RefundStatusDetails = {
    /** The reason why the refund has the `PENDING` or `FAILED` status. */
    reason?: RefundIncompleteReason;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const refundStatusDetailsSchema: Schema<RefundStatusDetails>;
