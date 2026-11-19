import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CardCustomerInformation } from "./card-customer-information.js";
import { type LinkDescription } from "./link-description.js";
import { type VaultStatus } from "./vault-status.js";
/** The details about a saved Card payment source. */
export type CardVaultResponse = {
    /** The PayPal-generated ID for the saved payment source. */
    id?: string;
    /**
     * The vault status.
     *
     * @deprecated
     */
    status?: VaultStatus;
    /** An array of request-related HATEOAS links. */
    links?: LinkDescription[];
    /** The details about a customer in PayPal's system of record. */
    customer?: CardCustomerInformation;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardVaultResponseInternalSchema: Schema<CardVaultResponse>;
export declare const cardVaultResponseSchema: Schema<CardVaultResponse>;
