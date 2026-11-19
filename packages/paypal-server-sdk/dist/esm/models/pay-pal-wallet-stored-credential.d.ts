import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PaymentInitiator } from "./payment-initiator.js";
import { StoredPaymentSourceUsageType } from "./stored-payment-source-usage-type.js";
import { type UsagePattern } from "./usage-pattern.js";
/**
 * Provides additional details to process a payment using the PayPal wallet billing agreement or a
 * vaulted payment method that has been stored or is intended to be stored.
 */
export type PayPalWalletStoredCredential = {
    /** The person or party who initiated or triggered the payment. */
    paymentInitiator: PaymentInitiator;
    /**
     * DEPRECATED. Expected business/pricing model for the billing agreement, Please use usage_pattern
     * instead.
     *
     * @deprecated
     */
    chargePattern?: UsagePattern;
    /** Expected business/pricing model for the billing agreement. */
    usagePattern?: UsagePattern;
    /**
     * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also
     * referred to as stored credential or card on file).
     *
     * @default StoredPaymentSourceUsageType.Derived
     */
    usage?: StoredPaymentSourceUsageType;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payPalWalletStoredCredentialSchema: Schema<PayPalWalletStoredCredential>;
