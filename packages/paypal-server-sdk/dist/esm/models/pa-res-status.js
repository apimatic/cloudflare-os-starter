import * as s from "../core/validation/index.js";
/** Transactions status result identifier. The outcome of the issuer's authentication. */
export const PaResStatus = {
    /** Successful authentication. */
    Y: "Y",
    /** Failed authentication / account not verified / transaction denied. */
    N: "N",
    /** Unable to complete authentication. */
    U: "U",
    /** Successful attempts transaction. */
    A: "A",
    /** Challenge required for authentication. */
    C: "C",
    /** Authentication rejected (merchant must not submit for authorization). */
    R: "R",
    /** Challenge required; decoupled authentication confirmed. */
    D: "D",
    /** Informational only; 3DS requestor challenge preference acknowledged. */
    I: "I",
};
export const paResStatusSchema = s.enumOf(PaResStatus);
//# sourceMappingURL=pa-res-status.js.map