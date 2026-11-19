import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The merchant preferences for a subscription. */
export type MerchantPreferences = {
    /** The URL where the customer is redirected after the customer approves the payment. */
    returnUrl?: string;
    /** The URL where the customer is redirected after the customer cancels the payment. */
    cancelUrl?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const merchantPreferencesInternalSchema: Schema<MerchantPreferences>;
export declare const merchantPreferencesSchema: Schema<MerchantPreferences>;
