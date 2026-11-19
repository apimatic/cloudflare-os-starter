import * as s from "../core/validation/index.js";
import { binDetailsInternalSchema, binDetailsSchema } from "./bin-details.js";
import { cardAuthenticationResponseInternalSchema, cardAuthenticationResponseSchema, } from "./card-authentication-response.js";
import { cardBrandSchema } from "./card-brand.js";
import { cardResponseAddressInternalSchema, cardResponseAddressSchema, } from "./card-response-address.js";
import { cardTypeSchema } from "./card-type.js";
import { cardVerificationDetailsInternalSchema, cardVerificationDetailsSchema, } from "./card-verification-details.js";
import { cardVerificationStatusSchema } from "./card-verification-status.js";
import { networkTransactionReferenceEntityInternalSchema, networkTransactionReferenceEntitySchema, } from "./network-transaction-reference-entity.js";
const setupTokenResponseCardProperties = {
    name: s.optional(s.string()),
    lastDigits: s.optional(s.string()),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    expiry: s.optional(s.string()),
    billingAddress: s.optional(s.lazy(() => cardResponseAddressInternalSchema)),
    verificationStatus: s.optional(s.lazy(() => cardVerificationStatusSchema)),
    verification: s.optional(s.lazy(() => cardVerificationDetailsInternalSchema)),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionReferenceEntityInternalSchema)),
    authenticationResult: s.optional(s.lazy(() => cardAuthenticationResponseInternalSchema)),
    binDetails: s.optional(s.lazy(() => binDetailsInternalSchema)),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    _keysMap: {
        lastDigits: "last_digits",
        billingAddress: "billing_address",
        verificationStatus: "verification_status",
        networkTransactionReference: "network_transaction_reference",
        authenticationResult: "authentication_result",
        binDetails: "bin_details",
    },
};
export const setupTokenResponseCardInternalSchema = s.object(setupTokenResponseCardProperties, { additionalProperties: s.json() });
export const setupTokenResponseCardSchema = s.lazySchema(() => s.object({
    ...setupTokenResponseCardProperties,
    name: s.optional(s.string().check(s.minLength(2), s.maxLength(300), s.pattern("^[A-Za-z ]+$"))),
    lastDigits: s.optional(s.string().check(s.minLength(2), s.maxLength(4), s.pattern("[0-9]{2,}"))),
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    billingAddress: s.optional(s.lazy(() => cardResponseAddressSchema)),
    verification: s.optional(s.lazy(() => cardVerificationDetailsSchema)),
    networkTransactionReference: s.optional(s.lazy(() => networkTransactionReferenceEntitySchema)),
    authenticationResult: s.optional(s.lazy(() => cardAuthenticationResponseSchema)),
    binDetails: s.optional(s.lazy(() => binDetailsSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=setup-token-response-card.js.map