import * as s from "../core/validation/index.js";
/** The status of the subscription. */
export const Status = {
    ApprovalPending: "APPROVAL_PENDING",
    Approved: "APPROVED",
    Active: "ACTIVE",
    Suspended: "SUSPENDED",
    Cancelled: "CANCELLED",
    Expired: "EXPIRED",
};
export const statusSchema = s.enumOf(Status);
