import type { EnumSchema } from "../core/validation/schema.js";
/** The plan status. */
export declare const SubscriptionPlanStatus: {
    /** The plan was created. You cannot create subscriptions for a plan in this state. */
    readonly Created: "CREATED";
    /** The plan is inactive. */
    readonly Inactive: "INACTIVE";
    /** The plan is active. You can only create subscriptions for a plan in this state. */
    readonly Active: "ACTIVE";
};
export type SubscriptionPlanStatus = (typeof SubscriptionPlanStatus)[keyof typeof SubscriptionPlanStatus] | (string & {});
export declare const subscriptionPlanStatusSchema: EnumSchema<SubscriptionPlanStatus>;
