import type { JsonValue, Schema } from "../core/validation/schema.js";
import { ApplicationContextShippingPreference } from "./application-context-shipping-preference.js";
import { type PaymentMethod } from "./payment-method.js";
/**
 * The application context, which customizes the payer experience during the subscription approval
 * process with PayPal.
 */
export type SubscriptionPatchApplicationContext = {
    /**
     * The label that overrides the business name in the PayPal account on the PayPal site.
     *
     * @deprecated
     */
    brandName?: string;
    /**
     * The BCP 47-formatted locale of pages that the PayPal payment experience shows. PayPal supports
     * a five-character code. For example, `da-DK`, `he-IL`, `id-ID`, `ja-JP`, `no-NO`, `pt-BR`,
     * `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`.
     *
     * @deprecated
     */
    locale?: string;
    /**
     * The location from which the shipping address is derived.
     *
     * @deprecated
     *
     * @default ApplicationContextShippingPreference.GetFromFile
     */
    shippingPreference?: ApplicationContextShippingPreference;
    /**
     * The customer and merchant payment preferences.
     *
     * @deprecated
     */
    paymentMethod?: PaymentMethod;
    /**
     * The URL where the customer is redirected after the customer approves the payment.
     *
     * @deprecated
     */
    returnUrl: string;
    /**
     * The URL where the customer is redirected after the customer cancels the payment.
     *
     * @deprecated
     */
    cancelUrl: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionPatchApplicationContextInternalSchema: Schema<SubscriptionPatchApplicationContext>;
export declare const subscriptionPatchApplicationContextSchema: Schema<SubscriptionPatchApplicationContext>;
