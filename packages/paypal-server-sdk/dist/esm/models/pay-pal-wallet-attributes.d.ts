import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PayPalWalletCustomerRequest } from "./pay-pal-wallet-customer-request.js";
import { type PayPalWalletVaultInstruction } from "./pay-pal-wallet-vault-instruction.js";
/** Additional attributes associated with the use of this PayPal Wallet. */
export type PayPalWalletAttributes = {
    customer?: PayPalWalletCustomerRequest;
    /** Resource consolidating common request and response attributes for vaulting PayPal Wallet. */
    vault?: PayPalWalletVaultInstruction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payPalWalletAttributesInternalSchema: Schema<PayPalWalletAttributes>;
export declare const payPalWalletAttributesSchema: Schema<PayPalWalletAttributes>;
