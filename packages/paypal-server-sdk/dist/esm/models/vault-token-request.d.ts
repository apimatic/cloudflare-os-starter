import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type VaultTokenRequestType } from "./vault-token-request-type.js";
/** The Tokenized Payment Source representing a Request to Vault a Token. */
export type VaultTokenRequest = {
    /** The PayPal-generated ID for the token. */
    id: string;
    /** The tokenization method that generated the ID. */
    type: VaultTokenRequestType;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultTokenRequestInternalSchema: Schema<VaultTokenRequest>;
export declare const vaultTokenRequestSchema: Schema<VaultTokenRequest>;
