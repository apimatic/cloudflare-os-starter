import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type VenmoVaultResponse } from "./venmo-vault-response.js";
/** Additional attributes associated with the use of a Venmo Wallet. */
export type VenmoWalletAttributesResponse = {
    /** The details about a saved venmo payment source. */
    vault?: VenmoVaultResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoWalletAttributesResponseInternalSchema: Schema<VenmoWalletAttributesResponse>;
export declare const venmoWalletAttributesResponseSchema: Schema<VenmoWalletAttributesResponse>;
