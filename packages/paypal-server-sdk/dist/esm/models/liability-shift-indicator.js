import * as s from "../core/validation/index.js";
/** Liability shift indicator. The outcome of the issuer's authentication. */
export const LiabilityShiftIndicator = {
    /** Liability is with the merchant. */
    No: "NO",
    /** Liability may shift to the card issuer. */
    Possible: "POSSIBLE",
    /** The authentication system is not available. */
    Unknown: "UNKNOWN",
};
export const liabilityShiftIndicatorSchema = s.enumOf(LiabilityShiftIndicator);
