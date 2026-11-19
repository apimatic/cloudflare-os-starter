import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CobrandedCard } from "./cobranded-card.js";
import { type PayPalWalletVaultResponse } from "./pay-pal-wallet-vault-response.js";
/** Additional attributes associated with the use of a PayPal Wallet. */
export type PayPalWalletAttributesResponse = {
    /** The details about a saved PayPal Wallet payment source. */
    vault?: PayPalWalletVaultResponse;
    /**
     * An array of merchant cobranded cards used by buyer to complete an order. This array will be
     * present if a merchant has onboarded their cobranded card with PayPal and provided corresponding
     * label(s).
     */
    cobrandedCards?: CobrandedCard[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payPalWalletAttributesResponseInternalSchema: Schema<PayPalWalletAttributesResponse>;
export declare const payPalWalletAttributesResponseSchema: Schema<PayPalWalletAttributesResponse>;
