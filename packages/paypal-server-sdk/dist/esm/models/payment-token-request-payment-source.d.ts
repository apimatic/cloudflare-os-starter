import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PaymentTokenRequestCard } from "./payment-token-request-card.js";
import { type VaultTokenRequest } from "./vault-token-request.js";
/** The payment method to vault with the instrument details. */
export type PaymentTokenRequestPaymentSource = {
    /** A Resource representing a request to vault a Card. */
    card?: PaymentTokenRequestCard;
    /** The Tokenized Payment Source representing a Request to Vault a Token. */
    token?: VaultTokenRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentTokenRequestPaymentSourceInternalSchema: Schema<PaymentTokenRequestPaymentSource>;
export declare const paymentTokenRequestPaymentSourceSchema: Schema<PaymentTokenRequestPaymentSource>;
