import type { EnumSchema } from "../core/validation/schema.js";
/** The reason why the authorized status is `PENDING`. */
export declare const AuthorizationIncompleteReason: {
    /** Authorization is pending manual review. */
    readonly PendingReview: "PENDING_REVIEW";
    /** Risk Filter set by the payee failed for the transaction. */
    readonly DeclinedByRiskFraudFilters: "DECLINED_BY_RISK_FRAUD_FILTERS";
};
export type AuthorizationIncompleteReason = (typeof AuthorizationIncompleteReason)[keyof typeof AuthorizationIncompleteReason] | (string & {});
export declare const authorizationIncompleteReasonSchema: EnumSchema<AuthorizationIncompleteReason>;
