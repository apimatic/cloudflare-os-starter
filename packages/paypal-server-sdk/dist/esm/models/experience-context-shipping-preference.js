import * as s from "../core/validation/index.js";
/** The location from which the shipping address is derived. */
export const ExperienceContextShippingPreference = {
    /** Get the customer-provided shipping address on the PayPal site. */
    GetFromFile: "GET_FROM_FILE",
    /** Redacts the shipping address from the PayPal site. Recommended for digital goods. */
    NoShipping: "NO_SHIPPING",
    /**
     * Merchant sends the shipping address using purchase_units.shipping.address. The customer cannot
     * change this address on the PayPal site.
     */
    SetProvidedAddress: "SET_PROVIDED_ADDRESS",
};
export const experienceContextShippingPreferenceSchema = s.enumOf(ExperienceContextShippingPreference);
