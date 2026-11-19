import * as s from "../core/validation/index.js";
/** The reason why the refund has the `PENDING` or `FAILED` status. */
export const RefundIncompleteReason = {
    /** The customer's account is funded through an eCheck, which has not yet cleared. */
    Echeck: "ECHECK",
};
export const refundIncompleteReasonSchema = s.enumOf(RefundIncompleteReason);
//# sourceMappingURL=refund-incomplete-reason.js.map