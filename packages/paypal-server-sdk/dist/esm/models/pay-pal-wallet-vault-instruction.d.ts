import type { JsonValue, Schema } from "../core/validation/schema.js";
import { PayPalPaymentTokenCustomerType } from "./pay-pal-payment-token-customer-type.js";
import { type PayPalPaymentTokenUsageType } from "./pay-pal-payment-token-usage-type.js";
import { type UsagePattern } from "./usage-pattern.js";
/** Resource consolidating common request and response attributes for vaulting PayPal Wallet. */
export type PayPalWalletVaultInstruction = {
    /**
     * The description displayed to PayPal consumer on the approval flow for PayPal, as well as on the
     * PayPal payment token management experience on PayPal.com.
     */
    description?: string;
    /** Expected business/pricing model for the billing agreement. */
    usagePattern?: UsagePattern;
    /** The usage type associated with the PayPal payment token. */
    usageType: PayPalPaymentTokenUsageType;
    /**
     * The customer type associated with the PayPal payment token. This is to indicate whether the
     * customer acting on the merchant / platform is either a business or a consumer.
     *
     * @default PayPalPaymentTokenCustomerType.Consumer
     */
    customerType?: PayPalPaymentTokenCustomerType;
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
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payPalWalletVaultInstructionInternalSchema: Schema<PayPalWalletVaultInstruction>;
export declare const payPalWalletVaultInstructionSchema: Schema<PayPalWalletVaultInstruction>;
