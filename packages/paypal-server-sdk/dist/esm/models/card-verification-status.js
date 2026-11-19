import * as s from "../core/validation/index.js";
/** Verification status of Card. */
export const CardVerificationStatus = {
    /** Card has been verified */
    Verified: "VERIFIED",
    /** Card verification has failed */
    Failed: "FAILED",
};
export const cardVerificationStatusSchema = s.enumOf(CardVerificationStatus);
//# sourceMappingURL=card-verification-status.js.map