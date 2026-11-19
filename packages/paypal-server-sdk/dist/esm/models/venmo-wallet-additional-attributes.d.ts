import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type VenmoWalletCustomerInformation } from "./venmo-wallet-customer-information.js";
import { type VenmoWalletVaultAttributes } from "./venmo-wallet-vault-attributes.js";
/** Additional attributes associated with the use of this Venmo Wallet. */
export type VenmoWalletAdditionalAttributes = {
    /** The details about a customer in PayPal's system of record. */
    customer?: VenmoWalletCustomerInformation;
    /** Resource consolidating common request and response attirbutes for vaulting Venmo Wallet. */
    vault?: VenmoWalletVaultAttributes;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoWalletAdditionalAttributesInternalSchema: Schema<VenmoWalletAdditionalAttributes>;
export declare const venmoWalletAdditionalAttributesSchema: Schema<VenmoWalletAdditionalAttributes>;
