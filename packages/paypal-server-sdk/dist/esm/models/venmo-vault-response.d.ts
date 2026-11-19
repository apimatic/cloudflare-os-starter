import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CustomerInformation } from "./customer-information.js";
import { type LinkDescription } from "./link-description.js";
import { type VenmoVaultResponseStatus } from "./venmo-vault-response-status.js";
/** The details about a saved venmo payment source. */
export type VenmoVaultResponse = {
    /** The PayPal-generated ID for the saved payment source. */
    id?: string;
    /**
     * The vault status.
     *
     * @deprecated
     */
    status?: VenmoVaultResponseStatus;
    /** An array of request-related HATEOAS links. */
    links?: LinkDescription[];
    /**
     * This object represents a merchant’s customer, allowing them to store contact details, and track
     * all payments associated with the same customer.
     */
    customer?: CustomerInformation;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoVaultResponseInternalSchema: Schema<VenmoVaultResponse>;
export declare const venmoVaultResponseSchema: Schema<VenmoVaultResponse>;
