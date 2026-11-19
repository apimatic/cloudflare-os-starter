import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CardVaultResponse } from "./card-vault-response.js";
/** Additional attributes associated with the use of this card. */
export type CardAttributesResponse = {
    /** The details about a saved Card payment source. */
    vault?: CardVaultResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardAttributesResponseInternalSchema: Schema<CardAttributesResponse>;
export declare const cardAttributesResponseSchema: Schema<CardAttributesResponse>;
