import * as s from "../core/validation/index.js";
import { authenticationEligibilityStatusSchema, } from "./authentication-eligibility-status.js";
import { paResStatusSchema } from "./pa-res-status.js";
const threeDSecureCardAuthenticationResponseProperties = {
    authenticationStatus: s.optional(s.lazy(() => paResStatusSchema)),
    enrollmentStatus: s.optional(s.lazy(() => authenticationEligibilityStatusSchema)),
    authenticationId: s.optional(s.string()),
    _keysMap: {
        authenticationStatus: "authentication_status",
        enrollmentStatus: "enrollment_status",
        authenticationId: "authentication_id",
    },
};
export const threeDSecureCardAuthenticationResponseInternalSchema = s.object(threeDSecureCardAuthenticationResponseProperties, {
    additionalProperties: s.json(),
});
export const threeDSecureCardAuthenticationResponseSchema = s.lazySchema(() => s.object({
    ...threeDSecureCardAuthenticationResponseProperties,
    authenticationId: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=three-dsecure-card-authentication-response.js.map