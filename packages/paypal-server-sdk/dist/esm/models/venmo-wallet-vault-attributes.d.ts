import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
import { VenmoPaymentTokenCustomerType } from "./venmo-payment-token-customer-type.js";
import { type VenmoPaymentTokenUsagePattern } from "./venmo-payment-token-usage-pattern.js";
import { type VenmoPaymentTokenUsageType } from "./venmo-payment-token-usage-type.js";
/** Resource consolidating common request and response attirbutes for vaulting Venmo Wallet. */
export type VenmoWalletVaultAttributes = {
    /** Defines how and when the payment source gets vaulted. */
    storeInVault: StoreInVaultInstruction;
    /**
     * The description displayed to Venmo consumer on the approval flow for Venmo, as well as on the
     * Venmo payment token management experience on Venmo.com.
     */
    description?: string;
    /** Expected business/pricing model for the billing agreement. */
    usagePattern?: VenmoPaymentTokenUsagePattern;
    /** The usage type associated with the Venmo payment token. */
    usageType: VenmoPaymentTokenUsageType;
    /**
     * The customer type associated with the Venmo payment token. This is to indicate whether the
     * customer acting on the merchant / platform is either a business or a consumer.
     *
     * @default VenmoPaymentTokenCustomerType.Consumer
     */
    customerType?: VenmoPaymentTokenCustomerType;
    /**
     * Create multiple payment tokens for the same payer, merchant/platform combination. Use this when
     * the customer has not logged in at merchant/platform. The payment token thus generated, can then
     * also be used to create the customer account at merchant/platform. Use this also when multiple
     * payment tokens are required for the same payer, different customer at merchant/platform. This
     * helps to identify customers distinctly even though they may share the same Venmo account.
     *
     * @default false
     */
    permitMultiplePaymentTokens?: boolean;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoWalletVaultAttributesInternalSchema: Schema<VenmoWalletVaultAttributes>;
export declare const venmoWalletVaultAttributesSchema: Schema<VenmoWalletVaultAttributes>;
