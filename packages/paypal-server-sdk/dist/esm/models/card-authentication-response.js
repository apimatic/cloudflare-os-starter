import * as s from "../core/validation/index.js";
import { threeDSecureCardAuthenticationResponseInternalSchema, threeDSecureCardAuthenticationResponseSchema, } from "./three-dsecure-card-authentication-response.js";
const cardAuthenticationResponseProperties = {
    threeDSecure: s.optional(s.lazy(() => threeDSecureCardAuthenticationResponseInternalSchema)),
    _keysMap: {
        threeDSecure: "three_d_secure",
    },
};
export const cardAuthenticationResponseInternalSchema = s.object(cardAuthenticationResponseProperties, {
    additionalProperties: s.json(),
});
export const cardAuthenticationResponseSchema = s.lazySchema(() => s.object({
    ...cardAuthenticationResponseProperties,
    threeDSecure: s.optional(s.lazy(() => threeDSecureCardAuthenticationResponseSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-authentication-response.js.map