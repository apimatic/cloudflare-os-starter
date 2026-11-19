import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CallbackConfiguration } from "./callback-configuration.js";
import { VenmoWalletExperienceContextShippingPreference } from "./venmo-wallet-experience-context-shipping-preference.js";
import { VenmoWalletExperienceContextUserAction } from "./venmo-wallet-experience-context-user-action.js";
/**
 * Customizes the buyer experience during the approval process for payment with Venmo. Note:
 * Partners and Marketplaces might configure shipping_preference during partner account setup, which
 * overrides the request values.
 */
export type VenmoWalletExperienceContext = {
    /**
     * The business name of the merchant. The pattern is defined by an external party and supports
     * Unicode.
     */
    brandName?: string;
    /**
     * The location from which the shipping address is derived.
     *
     * @default VenmoWalletExperienceContextShippingPreference.GetFromFile
     */
    shippingPreference?: VenmoWalletExperienceContextShippingPreference;
    /** CallBack Configuration that the merchant can provide to PayPal/Venmo. */
    orderUpdateCallbackConfig?: CallbackConfiguration;
    /**
     * Configures a Continue or Pay Now checkout flow.
     *
     * @default VenmoWalletExperienceContextUserAction.Continue
     */
    userAction?: VenmoWalletExperienceContextUserAction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoWalletExperienceContextInternalSchema: Schema<VenmoWalletExperienceContext>;
export declare const venmoWalletExperienceContextSchema: Schema<VenmoWalletExperienceContext>;
