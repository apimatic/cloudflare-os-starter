import * as s from "../core/validation/index.js";
import { authenticationEligibilityStatusSchema, } from "./authentication-eligibility-status.js";
import { paResStatusSchema } from "./pa-res-status.js";
export const threeDSecureAuthenticationResponsePaymentMethodTokensSchema = s.object({
    authenticationStatus: s.optional(s.lazy(() => paResStatusSchema)),
    enrollmentStatus: s.optional(s.lazy(() => authenticationEligibilityStatusSchema)),
    _keysMap: {
        authenticationStatus: "authentication_status",
        enrollmentStatus: "enrollment_status",
    },
}, { additionalProperties: s.json() });
