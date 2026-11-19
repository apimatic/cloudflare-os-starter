import type { EnumSchema } from "../core/validation/schema.js";
/** The status of the refund. */
export declare const RefundStatus: {
    /** The refund was cancelled. */
    readonly Cancelled: "CANCELLED";
    /** The refund could not be processed. */
    readonly Failed: "FAILED";
    /** The refund is pending. For more information, see status_details.reason. */
    readonly Pending: "PENDING";
    /** The funds for this transaction were debited to the customer's account. */
    readonly Completed: "COMPLETED";
};
export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus] | (string & {});
export declare const refundStatusSchema: EnumSchema<RefundStatus>;
