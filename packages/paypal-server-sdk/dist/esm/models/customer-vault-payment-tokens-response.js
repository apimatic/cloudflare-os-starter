import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { paymentTokenResponseInternalSchema, paymentTokenResponseSchema, } from "./payment-token-response.js";
import { vaultResponseCustomerInternalSchema, vaultResponseCustomerSchema, } from "./vault-response-customer.js";
const customerVaultPaymentTokensResponseProperties = {
    totalItems: s.optional(s.int()),
    totalPages: s.optional(s.int()),
    customer: s.optional(s.lazy(() => vaultResponseCustomerInternalSchema)),
    paymentTokens: s.optional(s.array(s.lazy(() => paymentTokenResponseInternalSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        totalItems: "total_items",
        totalPages: "total_pages",
        paymentTokens: "payment_tokens",
    },
};
export const customerVaultPaymentTokensResponseInternalSchema = s.object(customerVaultPaymentTokensResponseProperties, {
    additionalProperties: s.json(),
});
export const customerVaultPaymentTokensResponseSchema = s.lazySchema(() => s.object({
    ...customerVaultPaymentTokensResponseProperties,
    totalItems: s.optional(s.int().check(s.gte(1), s.lte(50))),
    totalPages: s.optional(s.int().check(s.gte(1), s.lte(10))),
    customer: s.optional(s.lazy(() => vaultResponseCustomerSchema)),
    paymentTokens: s.optional(s.array(s.lazy(() => paymentTokenResponseSchema)).check(s.minLength(0), s.maxLength(64))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(32))),
}, { additionalProperties: s.json() }));
