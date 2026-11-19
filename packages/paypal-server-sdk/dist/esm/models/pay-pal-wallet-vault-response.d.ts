import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type LinkDescription } from "./link-description.js";
import { type PayPalWalletCustomer } from "./pay-pal-wallet-customer.js";
import { type PayPalWalletVaultStatus } from "./pay-pal-wallet-vault-status.js";
/** The details about a saved PayPal Wallet payment source. */
export type PayPalWalletVaultResponse = {
    /** The PayPal-generated ID for the saved payment source. */
    id?: string;
    /**
     * The vault status.
     *
     * @deprecated
     */
    status?: PayPalWalletVaultStatus;
    /** An array of request-related HATEOAS links. */
    links?: LinkDescription[];
    /** The details about a customer in PayPal's system of record. */
    customer?: PayPalWalletCustomer;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payPalWalletVaultResponseInternalSchema: Schema<PayPalWalletVaultResponse>;
export declare const payPalWalletVaultResponseSchema: Schema<PayPalWalletVaultResponse>;
