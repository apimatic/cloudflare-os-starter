import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BankRequest } from "./bank-request.js";
import { type SetupTokenRequestCard } from "./setup-token-request-card.js";
import { type VaultApplePayRequest } from "./vault-apple-pay-request.js";
import { type VaultPayPalWalletRequest } from "./vault-pay-pal-wallet-request.js";
import { type VaultTokenRequest } from "./vault-token-request.js";
import { type VaultVenmoRequest } from "./vault-venmo-request.js";
/** The payment method to vault with the instrument details. */
export type SetupTokenRequestPaymentSource = {
    /** A Resource representing a request to vault a Card. */
    card?: SetupTokenRequestCard;
    /** A resource representing a request to vault PayPal Wallet. */
    paypal?: VaultPayPalWalletRequest;
    /** A resource representing a request to vault Venmo. */
    venmo?: VaultVenmoRequest;
    /** A resource representing a request to vault Apple Pay. */
    applePay?: VaultApplePayRequest;
    /** The Tokenized Payment Source representing a Request to Vault a Token. */
    token?: VaultTokenRequest;
    /** A Resource representing a request to vault a Bank used for ACH Debit. */
    bank?: BankRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const setupTokenRequestPaymentSourceInternalSchema: Schema<SetupTokenRequestPaymentSource>;
export declare const setupTokenRequestPaymentSourceSchema: Schema<SetupTokenRequestPaymentSource>;
