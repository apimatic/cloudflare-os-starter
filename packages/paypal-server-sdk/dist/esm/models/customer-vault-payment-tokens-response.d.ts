import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type PaymentTokenResponse } from "./payment-token-response.js";
import { type VaultResponseCustomer } from "./vault-response-customer.js";
/** Collection of payment tokens saved for a given customer. */
export type CustomerVaultPaymentTokensResponse = {
    /** Total number of items. */
    totalItems?: number;
    /** Total number of pages. */
    totalPages?: number;
    /**
     * This object defines a customer in your system. Use it to manage customer profiles, save payment
     * methods and contact details.
     */
    customer?: VaultResponseCustomer;
    paymentTokens?: PaymentTokenResponse[];
    /** An array of related [HATEOAS links](/api/rest/responses/#hateoas). */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const customerVaultPaymentTokensResponseInternalSchema: Schema<CustomerVaultPaymentTokensResponse>;
export declare const customerVaultPaymentTokensResponseSchema: Schema<CustomerVaultPaymentTokensResponse>;
