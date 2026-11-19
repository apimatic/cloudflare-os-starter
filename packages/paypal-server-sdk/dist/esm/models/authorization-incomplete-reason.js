import * as s from "../core/validation/index.js";
/** The reason why the authorized status is `PENDING`. */
export const AuthorizationIncompleteReason = {
    /** Authorization is pending manual review. */
    PendingReview: "PENDING_REVIEW",
    /** Risk Filter set by the payee failed for the transaction. */
    DeclinedByRiskFraudFilters: "DECLINED_BY_RISK_FRAUD_FILTERS",
};
export const authorizationIncompleteReasonSchema = s.enumOf(AuthorizationIncompleteReason);
//# sourceMappingURL=authorization-incomplete-reason.js.map