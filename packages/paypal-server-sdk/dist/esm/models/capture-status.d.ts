import type { EnumSchema } from "../core/validation/schema.js";
/** The status of the captured payment. */
export declare const CaptureStatus: {
    /** The funds for this captured payment were credited to the payee's PayPal account. */
    readonly Completed: "COMPLETED";
    /** The funds could not be captured. */
    readonly Declined: "DECLINED";
    /** An amount less than this captured payment's amount was partially refunded to the payer. */
    readonly PartiallyRefunded: "PARTIALLY_REFUNDED";
    /**
     * The funds for this captured payment was not yet credited to the payee's PayPal account. For
     * more information, see status.details.
     */
    readonly Pending: "PENDING";
    /**
     * An amount greater than or equal to this captured payment's amount was refunded to the payer.
     */
    readonly Refunded: "REFUNDED";
    /** There was an error while capturing payment. */
    readonly Failed: "FAILED";
};
export type CaptureStatus = (typeof CaptureStatus)[keyof typeof CaptureStatus] | (string & {});
export declare const captureStatusSchema: EnumSchema<CaptureStatus>;
