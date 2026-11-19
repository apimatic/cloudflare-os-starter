import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LiabilityShiftIndicator } from "./liability-shift-indicator.js";
import { type ThreeDSecureAuthenticationResponse } from "./three-dsecure-authentication-response.js";
/** Results of Authentication such as 3D Secure. */
export type AuthenticationResponse = {
    /** Liability shift indicator. The outcome of the issuer's authentication. */
    liabilityShift?: LiabilityShiftIndicator;
    /** Results of 3D Secure Authentication. */
    threeDSecure?: ThreeDSecureAuthenticationResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const authenticationResponseSchema: Schema<AuthenticationResponse>;
