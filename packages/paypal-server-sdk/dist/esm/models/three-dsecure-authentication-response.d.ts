import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type EnrollmentStatus } from "./enrollment-status.js";
import { type PaResStatus } from "./pa-res-status.js";
/** Results of 3D Secure Authentication. */
export type ThreeDSecureAuthenticationResponse = {
    /** Transactions status result identifier. The outcome of the issuer's authentication. */
    authenticationStatus?: PaResStatus;
    /** Status of Authentication eligibility. */
    enrollmentStatus?: EnrollmentStatus;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const threeDSecureAuthenticationResponseSchema: Schema<ThreeDSecureAuthenticationResponse>;
