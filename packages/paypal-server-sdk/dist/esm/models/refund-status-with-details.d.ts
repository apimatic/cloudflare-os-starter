import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type RefundStatusDetails } from "./refund-status-details.js";
import { type RefundStatus } from "./refund-status.js";
/** The refund status with details. */
export type RefundStatusWithDetails = {
    /** The status of the refund. */
    status?: RefundStatus;
    /** The details of the refund status. */
    statusDetails?: RefundStatusDetails;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const refundStatusWithDetailsSchema: Schema<RefundStatusWithDetails>;
