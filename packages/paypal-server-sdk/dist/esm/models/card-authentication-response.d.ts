import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ThreeDSecureCardAuthenticationResponse } from "./three-dsecure-card-authentication-response.js";
/** Results of Authentication such as 3D Secure. */
export type CardAuthenticationResponse = {
    /** Results of 3D Secure Authentication. */
    threeDSecure?: ThreeDSecureCardAuthenticationResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardAuthenticationResponseInternalSchema: Schema<CardAuthenticationResponse>;
export declare const cardAuthenticationResponseSchema: Schema<CardAuthenticationResponse>;
