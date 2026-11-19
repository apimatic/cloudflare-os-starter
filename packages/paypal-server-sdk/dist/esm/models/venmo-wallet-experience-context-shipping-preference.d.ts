import type { EnumSchema } from "../core/validation/schema.js";
/** The location from which the shipping address is derived. */
export declare const VenmoWalletExperienceContextShippingPreference: {
    /** Get the customer-provided shipping address on the PayPal site. */
    readonly GetFromFile: "GET_FROM_FILE";
    /** Redacts the shipping address from the PayPal site. Recommended for digital goods. */
    readonly NoShipping: "NO_SHIPPING";
    /**
     * Get the merchant-provided address. The customer cannot change this address on the PayPal site.
     * If merchant does not pass an address, customer can choose the address on PayPal pages.
     */
    readonly SetProvidedAddress: "SET_PROVIDED_ADDRESS";
};
export type VenmoWalletExperienceContextShippingPreference = (typeof VenmoWalletExperienceContextShippingPreference)[keyof typeof VenmoWalletExperienceContextShippingPreference] | (string & {});
export declare const venmoWalletExperienceContextShippingPreferenceSchema: EnumSchema<VenmoWalletExperienceContextShippingPreference>;
