import type { EnumSchema } from "../core/validation/schema.js";
/** The location from which the shipping address is derived. */
export declare const ExperienceContextShippingPreference: {
    /** Get the customer-provided shipping address on the PayPal site. */
    readonly GetFromFile: "GET_FROM_FILE";
    /** Redacts the shipping address from the PayPal site. Recommended for digital goods. */
    readonly NoShipping: "NO_SHIPPING";
    /**
     * Merchant sends the shipping address using purchase_units.shipping.address. The customer cannot
     * change this address on the PayPal site.
     */
    readonly SetProvidedAddress: "SET_PROVIDED_ADDRESS";
};
export type ExperienceContextShippingPreference = (typeof ExperienceContextShippingPreference)[keyof typeof ExperienceContextShippingPreference] | (string & {});
export declare const experienceContextShippingPreferenceSchema: EnumSchema<ExperienceContextShippingPreference>;
