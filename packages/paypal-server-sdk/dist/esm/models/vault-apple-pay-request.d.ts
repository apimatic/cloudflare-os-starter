import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayRequestCard } from "./apple-pay-request-card.js";
/** A resource representing a request to vault Apple Pay. */
export type VaultApplePayRequest = {
    /** Encrypted Apple Pay token, containing card information. This token would be base64 encoded. */
    token?: string;
    /** The payment card to be used to fund a payment. Can be a credit or debit card. */
    card?: ApplePayRequestCard;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultApplePayRequestInternalSchema: Schema<VaultApplePayRequest>;
export declare const vaultApplePayRequestSchema: Schema<VaultApplePayRequest>;
