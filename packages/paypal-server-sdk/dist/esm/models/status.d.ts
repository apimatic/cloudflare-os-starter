import type { EnumSchema } from "../core/validation/schema.js";
/** The status of the subscription. */
export declare const Status: {
    readonly ApprovalPending: "APPROVAL_PENDING";
    readonly Approved: "APPROVED";
    readonly Active: "ACTIVE";
    readonly Suspended: "SUSPENDED";
    readonly Cancelled: "CANCELLED";
    readonly Expired: "EXPIRED";
};
export type Status = (typeof Status)[keyof typeof Status] | (string & {});
export declare const statusSchema: EnumSchema<Status>;
