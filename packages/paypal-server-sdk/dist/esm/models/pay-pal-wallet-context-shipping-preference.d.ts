import type { EnumSchema } from "../core/validation/schema.js";
/** The location from which the shipping address is derived. */
export declare const PayPalWalletContextShippingPreference: {
    /** Get the customer-provided shipping address on the PayPal site. */
    readonly GetFromFile: "GET_FROM_FILE";
    /**
     * Removes the shipping address information from the API response and the Paypal site. However,
     * the shipping.phone_number and shipping.email_address fields will still be returned to allow for
     * digital goods delivery.
     */
    readonly NoShipping: "NO_SHIPPING";
    /**
     * Get the merchant-provided address. The customer cannot change this address on the PayPal site.
     * If merchant does not pass an address, customer can choose the address on PayPal pages.
     */
    readonly SetProvidedAddress: "SET_PROVIDED_ADDRESS";
};
export type PayPalWalletContextShippingPreference = (typeof PayPalWalletContextShippingPreference)[keyof typeof PayPalWalletContextShippingPreference] | (string & {});
export declare const payPalWalletContextShippingPreferenceSchema: EnumSchema<PayPalWalletContextShippingPreference>;
