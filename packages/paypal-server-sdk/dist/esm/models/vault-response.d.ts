import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type VaultCustomer } from "./vault-customer.js";
import { type VaultStatus } from "./vault-status.js";
/** The details about a saved payment source. */
export type VaultResponse = {
    /** The PayPal-generated ID for the saved payment source. */
    id?: string;
    /**
     * The vault status.
     *
     * @deprecated
     */
    status?: VaultStatus;
    /**
     * This object represents a merchant’s customer, allowing them to store contact details, and track
     * all payments associated with the same customer.
     */
    customer?: VaultCustomer;
    /** An array of request-related HATEOAS links. */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultResponseInternalSchema: Schema<VaultResponse>;
export declare const vaultResponseSchema: Schema<VaultResponse>;
