import type { EnumSchema } from "../core/validation/schema.js";
/** Status of Authentication eligibility. */
export declare const AuthenticationEligibilityStatus: {
    /** Yes. The bank is participating in 3-D Secure protocol and will return the ACSUrl. */
    readonly Y: "Y";
    /** No. The bank is not participating in 3-D Secure protocol. */
    readonly N: "N";
    /** Unavailable. The DS or ACS is not available for authentication at the time of the request. */
    readonly U: "U";
    /** Bypass. The merchant authentication rule is triggered to bypass authentication. */
    readonly B: "B";
};
export type AuthenticationEligibilityStatus = (typeof AuthenticationEligibilityStatus)[keyof typeof AuthenticationEligibilityStatus] | (string & {});
export declare const authenticationEligibilityStatusSchema: EnumSchema<AuthenticationEligibilityStatus>;
