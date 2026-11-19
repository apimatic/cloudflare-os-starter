import * as s from "../core/validation/index.js";
import { liabilityShiftIndicatorSchema } from "./liability-shift-indicator.js";
import { threeDSecureAuthenticationResponseSchema, } from "./three-dsecure-authentication-response.js";
export const authenticationResponseSchema = s.object({
    liabilityShift: s.optional(s.lazy(() => liabilityShiftIndicatorSchema)),
    threeDSecure: s.optional(s.lazy(() => threeDSecureAuthenticationResponseSchema)),
    _keysMap: {
        liabilityShift: "liability_shift",
        threeDSecure: "three_d_secure",
    },
}, { additionalProperties: s.json() });
