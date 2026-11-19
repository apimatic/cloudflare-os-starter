import type { JsonValue, Schema } from "../core/validation/schema.js";
import { ReturnFlowPaymentMethodTokens } from "./return-flow-payment-method-tokens.js";
/** Buyer's mobile web browser context to app switch to the PayPal consumer app. */
export type MobileWebContextPaymentMethodTokens = {
    /**
     * Merchant preference on how the buyer can navigate back to merchant website post approving the
     * transaction on the PayPal App.
     *
     * @default ReturnFlowPaymentMethodTokens.Auto
     */
    returnFlow?: ReturnFlowPaymentMethodTokens;
    /**
     * User agent from the request originating from the buyer's device. This will be used to identify
     * the buyer's operating system and browser versions. NOTE: Merchants must not alter or modify the
     * buyer's device user agent.
     */
    buyerUserAgent?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const mobileWebContextPaymentMethodTokensInternalSchema: Schema<MobileWebContextPaymentMethodTokens>;
export declare const mobileWebContextPaymentMethodTokensSchema: Schema<MobileWebContextPaymentMethodTokens>;
