import type { EnumSchema } from "../core/validation/schema.js";
/** The shipping preference. This only applies to PayPal payment source. */
export declare const VenmoExperienceContextShippingPreference: {
    /** Use the payer-provided shipping address on the PayPal site. */
    readonly GetFromFile: "GET_FROM_FILE";
    /** Redact the shipping address from the PayPal site. Recommended for digital goods. */
    readonly NoShipping: "NO_SHIPPING";
    /**
     * Use the merchant/platform-provided address. The payer cannot change this address on the PayPal
     * site. If the merchant does not pass an address, the customer can choose the address on the
     * PayPal site.
     */
    readonly SetProvidedAddress: "SET_PROVIDED_ADDRESS";
};
export type VenmoExperienceContextShippingPreference = (typeof VenmoExperienceContextShippingPreference)[keyof typeof VenmoExperienceContextShippingPreference] | (string & {});
export declare const venmoExperienceContextShippingPreferenceSchema: EnumSchema<VenmoExperienceContextShippingPreference>;
