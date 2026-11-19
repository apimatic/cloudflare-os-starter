import * as s from "../core/validation/index.js";
/** The type of capture. */
export const CaptureType = {
    /** The outstanding balance that the subscriber must clear. */
    OutstandingBalance: "OUTSTANDING_BALANCE",
};
export const captureTypeSchema = s.enumOf(CaptureType);
