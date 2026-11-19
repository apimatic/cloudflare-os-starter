import type { EnumSchema } from "../core/validation/schema.js";
/**
 * This field indicates the status of PayPal's Checkout experience throughout the order lifecycle.
 * The values reflect the current stage of the checkout process.
 */
export declare const ExperienceStatus: {
    /** PayPal checkout process has not yet begun. */
    readonly NotStarted: "NOT_STARTED";
    /** PayPal checkout initiated. User is on the checkout page for order review before approval. */
    readonly InProgress: "IN_PROGRESS";
    /**
     * PayPal checkout is canceled (by closing the checkout window or clicking cancel) before the
     * order approval.
     */
    readonly Canceled: "CANCELED";
    /** Order is approved. User has completed the checkout process. */
    readonly Approved: "APPROVED";
};
export type ExperienceStatus = (typeof ExperienceStatus)[keyof typeof ExperienceStatus] | (string & {});
export declare const experienceStatusSchema: EnumSchema<ExperienceStatus>;
