import type { EnumSchema } from "../core/validation/schema.js";
/** The reason why the captured payment status is `PENDING` or `DENIED`. */
export declare const CaptureIncompleteReason: {
    /** The payer initiated a dispute for this captured payment with PayPal. */
    readonly BuyerComplaint: "BUYER_COMPLAINT";
    /**
     * The captured funds were reversed in response to the payer disputing this captured payment with
     * the issuer of the financial instrument used to pay for this captured payment.
     */
    readonly Chargeback: "CHARGEBACK";
    /** The payer paid by an eCheck that has not yet cleared. */
    readonly Echeck: "ECHECK";
    /** Visit your online account. In your **Account Overview**, accept and deny this payment. */
    readonly InternationalWithdrawal: "INTERNATIONAL_WITHDRAWAL";
    /**
     * No additional specific reason can be provided. For more information about this captured
     * payment, visit your account online or contact PayPal.
     */
    readonly Other: "OTHER";
    /** The captured payment is pending manual review. */
    readonly PendingReview: "PENDING_REVIEW";
    /**
     * The payee has not yet set up appropriate receiving preferences for their account. For more
     * information about how to accept or deny this payment, visit your account online. This reason is
     * typically offered in scenarios such as when the currency of the captured payment is different
     * from the primary holding currency of the payee.
     */
    readonly ReceivingPreferenceMandatesManualAction: "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION";
    /** The captured funds were refunded. */
    readonly Refunded: "REFUNDED";
    /**
     * The payer must send the funds for this captured payment. This code generally appears for manual
     * EFTs.
     */
    readonly TransactionApprovedAwaitingFunding: "TRANSACTION_APPROVED_AWAITING_FUNDING";
    /** The payee does not have a PayPal account. */
    readonly Unilateral: "UNILATERAL";
    /** The payee's PayPal account is not verified. */
    readonly VerificationRequired: "VERIFICATION_REQUIRED";
    /** Risk Filter set by the payee failed for the transaction. */
    readonly DeclinedByRiskFraudFilters: "DECLINED_BY_RISK_FRAUD_FILTERS";
};
export type CaptureIncompleteReason = (typeof CaptureIncompleteReason)[keyof typeof CaptureIncompleteReason] | (string & {});
export declare const captureIncompleteReasonSchema: EnumSchema<CaptureIncompleteReason>;
