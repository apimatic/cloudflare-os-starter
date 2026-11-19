import type { EnumSchema } from "../core/validation/schema.js";
/** The status for the authorized payment. */
export declare const AuthorizationStatus: {
    /**
     * The authorized payment is created. No captured payments have been made for this authorized
     * payment.
     */
    readonly Created: "CREATED";
    /**
     * The authorized payment has one or more captures against it. The sum of these captured payments
     * is greater than the amount of the original authorized payment.
     */
    readonly Captured: "CAPTURED";
    /** PayPal cannot authorize funds for this authorized payment. */
    readonly Denied: "DENIED";
    /**
     * A captured payment was made for the authorized payment for an amount that is less than the
     * amount of the original authorized payment.
     */
    readonly PartiallyCaptured: "PARTIALLY_CAPTURED";
    /**
     * The authorized payment was voided. No more captured payments can be made against this
     * authorized payment.
     */
    readonly Voided: "VOIDED";
    /** The created authorization is in pending state. For more information, see status.details. */
    readonly Pending: "PENDING";
};
export type AuthorizationStatus = (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus] | (string & {});
export declare const authorizationStatusSchema: EnumSchema<AuthorizationStatus>;
