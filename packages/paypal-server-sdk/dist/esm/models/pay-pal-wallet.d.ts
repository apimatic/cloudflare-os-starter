import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Address } from "./address.js";
import { type Name } from "./name.js";
import { type PayPalWalletAttributes } from "./pay-pal-wallet-attributes.js";
import { type PayPalWalletExperienceContext } from "./pay-pal-wallet-experience-context.js";
import { type PayPalWalletStoredCredential } from "./pay-pal-wallet-stored-credential.js";
import { type PhoneWithType } from "./phone-with-type.js";
import { type TaxInfo } from "./tax-info.js";
/** A resource that identifies a PayPal Wallet is used for payment. */
export type PayPalWallet = {
    /**
     * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
     * merchant's server so the saved payment source can be used for future transactions.
     */
    vaultId?: string;
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    emailAddress?: string;
    /** The name of the party. */
    name?: Name;
    /** The phone information. */
    phone?: PhoneWithType;
    /**
     * The stand-alone date, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). To represent special legal values,
     * such as a date of birth, you should use dates with no associated time or time-zone data.
     * Whenever possible, use the standard `date_time` type. This regular expression does not validate
     * all dates. For example, February 31 is valid and nothing is known about leap years.
     */
    birthDate?: string;
    /**
     * The tax ID of the customer. The customer is also known as the payer. Both `tax_id` and
     * `tax_id_type` are required.
     */
    taxInfo?: TaxInfo;
    /**
     * The portable international postal address. Maps to
     * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
     * and HTML 5.1 [Autofilling form controls: the autocomplete
     * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
     */
    address?: Address;
    /** Additional attributes associated with the use of this PayPal Wallet. */
    attributes?: PayPalWalletAttributes;
    /**
     * Customizes the payer experience during the approval process for payment with PayPal. Note:
     * Partners and Marketplaces might configure brand_name and shipping_preference during partner
     * account setup, which overrides the request values.
     */
    experienceContext?: PayPalWalletExperienceContext;
    /**
     * The PayPal billing agreement ID. References an approved recurring payment for goods or
     * services.
     */
    billingAgreementId?: string;
    /**
     * Provides additional details to process a payment using the PayPal wallet billing agreement or a
     * vaulted payment method that has been stored or is intended to be stored.
     */
    storedCredential?: PayPalWalletStoredCredential;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payPalWalletInternalSchema: Schema<PayPalWallet>;
export declare const payPalWalletSchema: Schema<PayPalWallet>;
