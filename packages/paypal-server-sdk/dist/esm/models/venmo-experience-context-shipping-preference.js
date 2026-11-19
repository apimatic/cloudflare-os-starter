import * as s from "../core/validation/index.js";
/** The shipping preference. This only applies to PayPal payment source. */
export const VenmoExperienceContextShippingPreference = {
    /** Use the payer-provided shipping address on the PayPal site. */
    GetFromFile: "GET_FROM_FILE",
    /** Redact the shipping address from the PayPal site. Recommended for digital goods. */
    NoShipping: "NO_SHIPPING",
    /**
     * Use the merchant/platform-provided address. The payer cannot change this address on the PayPal
     * site. If the merchant does not pass an address, the customer can choose the address on the
     * PayPal site.
     */
    SetProvidedAddress: "SET_PROVIDED_ADDRESS",
};
export const venmoExperienceContextShippingPreferenceSchema = s.enumOf(VenmoExperienceContextShippingPreference);
