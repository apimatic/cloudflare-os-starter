import type { EnumSchema } from "../core/validation/schema.js";
/** The initial state of the plan. Allowed input values are CREATED and ACTIVE. */
export declare const PlanRequestStatus: {
    /** The plan was created. You cannot create subscriptions for a plan in this state. */
    readonly Created: "CREATED";
    /** The plan is inactive. */
    readonly Inactive: "INACTIVE";
    /** The plan is active. You can only create subscriptions for a plan in this state. */
    readonly Active: "ACTIVE";
};
export type PlanRequestStatus = (typeof PlanRequestStatus)[keyof typeof PlanRequestStatus] | (string & {});
export declare const planRequestStatusSchema: EnumSchema<PlanRequestStatus>;
