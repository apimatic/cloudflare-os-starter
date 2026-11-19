import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type VaultResponse } from "./vault-response.js";
/** Additional attributes associated with the use of Apple Pay. */
export type ApplePayAttributesResponse = {
    /** The details about a saved payment source. */
    vault?: VaultResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const applePayAttributesResponseInternalSchema: Schema<ApplePayAttributesResponse>;
export declare const applePayAttributesResponseSchema: Schema<ApplePayAttributesResponse>;
