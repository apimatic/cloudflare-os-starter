import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CustomerType } from "./customer-type.js";
import { type Plan } from "./plan.js";
import { type UsagePatternPaymentMethodTokens } from "./usage-pattern-payment-method-tokens.js";
import { type UsageType } from "./usage-type.js";
import { type VaultExperienceContext } from "./vault-experience-context.js";
import { type VaultedDigitalWalletShippingDetails } from "./vaulted-digital-wallet-shipping-details.js";
/** A resource representing a request to vault PayPal Wallet. */
export type VaultPayPalWalletRequest = {
    /**
     * The description displayed to the consumer on the approval flow for a digital wallet, as well as
     * on the merchant view of the payment token management experience. exp: PayPal.com.
     */
    description?: string;
    /** Expected business/charge model for the billing agreement. */
    usagePattern?: UsagePatternPaymentMethodTokens;
    /** The shipping details. */
    shipping?: VaultedDigitalWalletShippingDetails;
    /**
     * Create multiple payment tokens for the same payer, merchant/platform combination. Use this when
     * the customer has not logged in at merchant/platform. The payment token thus generated, can then
     * also be used to create the customer account at merchant/platform. Use this also when multiple
     * payment tokens are required for the same payer, different customer at merchant/platform. This
     * helps to identify customers distinctly even though they may share the same PayPal account. This
     * only applies to PayPal payment source.
     *
     * @default false
     */
    permitMultiplePaymentTokens?: boolean;
    /** The usage type associated with a digital wallet payment token. */
    usageType?: UsageType;
    /**
     * The customer type associated with a digital wallet payment token. This is to indicate whether
     * the customer acting on the merchant / platform is either a business or a consumer.
     */
    customerType?: CustomerType;
    /** The merchant level Recurring Billing plan metadata for the Billing Agreement. */
    billingPlan?: Plan;
    /** A resource representing an experience context of vault PayPal Wallet. */
    experienceContext?: VaultExperienceContext;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultPayPalWalletRequestInternalSchema: Schema<VaultPayPalWalletRequest>;
export declare const vaultPayPalWalletRequestSchema: Schema<VaultPayPalWalletRequest>;
