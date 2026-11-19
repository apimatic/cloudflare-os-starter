import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AuthenticationEligibilityStatus } from "./authentication-eligibility-status.js";
import { type PaResStatus } from "./pa-res-status.js";
/** Results of 3D Secure Authentication. */
export type ThreeDSecureCardAuthenticationResponse = {
    /** Transactions status result identifier. The outcome of the issuer's authentication. */
    authenticationStatus?: PaResStatus;
    /** Status of Authentication eligibility. */
    enrollmentStatus?: AuthenticationEligibilityStatus;
    /**
     * The externally received 3ds authentication id, to be returned in card detokenization response.
     */
    authenticationId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const threeDSecureCardAuthenticationResponseInternalSchema: Schema<ThreeDSecureCardAuthenticationResponse>;
export declare const threeDSecureCardAuthenticationResponseSchema: Schema<ThreeDSecureCardAuthenticationResponse>;
