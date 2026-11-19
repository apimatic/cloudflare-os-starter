import * as s from "../core/validation/index.js";
import { enrollmentStatusSchema } from "./enrollment-status.js";
import { paResStatusSchema } from "./pa-res-status.js";
export const threeDSecureAuthenticationResponseSchema = s.object({
    authenticationStatus: s.optional(s.lazy(() => paResStatusSchema)),
    enrollmentStatus: s.optional(s.lazy(() => enrollmentStatusSchema)),
    _keysMap: {
        authenticationStatus: "authentication_status",
        enrollmentStatus: "enrollment_status",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=three-dsecure-authentication-response.js.map