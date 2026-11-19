import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type TokenType } from "./token-type.js";
/** The tokenized payment source to fund a payment. */
export type Token = {
    /** The PayPal-generated ID for the token. */
    id: string;
    /** The tokenization method that generated the ID. */
    type: TokenType;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const tokenInternalSchema: Schema<Token>;
export declare const tokenSchema: Schema<Token>;
