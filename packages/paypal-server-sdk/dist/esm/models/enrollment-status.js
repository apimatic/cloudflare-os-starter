import * as s from "../core/validation/index.js";
/** Status of Authentication eligibility. */
export const EnrollmentStatus = {
    /** Yes. The bank is participating in 3-D Secure protocol and will return the ACSUrl. */
    Y: "Y",
    /** No. The bank is not participating in 3-D Secure protocol. */
    N: "N",
    /** Unavailable. The DS or ACS is not available for authentication at the time of the request. */
    U: "U",
    /** Bypass. The merchant authentication rule is triggered to bypass authentication. */
    B: "B",
};
export const enrollmentStatusSchema = s.enumOf(EnrollmentStatus);
