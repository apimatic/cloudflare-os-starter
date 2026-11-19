import * as s from "../core/validation/index.js";
import { authenticationResponseSchema } from "./authentication-response.js";
import { binDetailsInternalSchema, binDetailsSchema } from "./bin-details.js";
import { cardAttributesResponseInternalSchema, cardAttributesResponseSchema, } from "./card-attributes-response.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardFromRequestInternalSchema, cardFromRequestSchema, } from "./card-from-request.js";
import { cardStoredCredentialInternalSchema, cardStoredCredentialSchema, } from "./card-stored-credential.js";
import { cardTypeSchema } from "./card-type.js";
const cardResponseProperties = {
    name: s.optional(s.string()),
    lastDigits: s.optional(s.string()),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    availableNetworks: s.optional(s.array(s.lazy(() => cardBrandSchema))),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    authenticationResult: s.optional(s.lazy(() => authenticationResponseSchema)),
    attributes: s.optional(s.lazy(() => cardAttributesResponseInternalSchema)),
    fromRequest: s.optional(s.lazy(() => cardFromRequestInternalSchema)),
    expiry: s.optional(s.string()),
    binDetails: s.optional(s.lazy(() => binDetailsInternalSchema)),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialInternalSchema)),
    _keysMap: {
        lastDigits: "last_digits",
        availableNetworks: "available_networks",
        authenticationResult: "authentication_result",
        fromRequest: "from_request",
        binDetails: "bin_details",
        storedCredential: "stored_credential",
    },
};
export const cardResponseInternalSchema = s.object(cardResponseProperties, { additionalProperties: s.json() });
export const cardResponseSchema = s.lazySchema(() => s.object({
    ...cardResponseProperties,
    name: s.optional(s.string().check(s.minLength(2), s.maxLength(300))),
    lastDigits: s.optional(s.string().check(s.pattern("[0-9]{2,}"))),
    availableNetworks: s.optional(s.array(s.lazy(() => cardBrandSchema)).check(s.minLength(1), s.maxLength(256))),
    attributes: s.optional(s.lazy(() => cardAttributesResponseSchema)),
    fromRequest: s.optional(s.lazy(() => cardFromRequestSchema)),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    binDetails: s.optional(s.lazy(() => binDetailsSchema)),
    storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-response.js.map