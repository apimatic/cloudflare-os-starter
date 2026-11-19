import type { EnumSchema } from "../core/validation/schema.js";
/** The reason why the refund has the `PENDING` or `FAILED` status. */
export declare const RefundIncompleteReason: {
    /** The customer's account is funded through an eCheck, which has not yet cleared. */
    readonly Echeck: "ECHECK";
};
export type RefundIncompleteReason = (typeof RefundIncompleteReason)[keyof typeof RefundIncompleteReason] | (string & {});
export declare const refundIncompleteReasonSchema: EnumSchema<RefundIncompleteReason>;
