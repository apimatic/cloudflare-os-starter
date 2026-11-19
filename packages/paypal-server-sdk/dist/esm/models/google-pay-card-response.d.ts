import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Address } from "./address.js";
import { type AuthenticationResponse } from "./authentication-response.js";
import { type CardBrand } from "./card-brand.js";
import { type CardType } from "./card-type.js";
/** The payment card to use to fund a Google Pay payment response. Can be a credit or debit card. */
export type GooglePayCardResponse = {
    /** The card holder's name as it appears on the card. */
    name?: string;
    /** The last digits of the payment card. */
    lastDigits?: string;
    /** Type of card. i.e Credit, Debit and so on. */
    type?: CardType;
    /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
    brand?: CardBrand;
    /**
     * The portable international postal address. Maps to
     * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
     * and HTML 5.1 [Autofilling form controls: the autocomplete
     * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
     */
    billingAddress?: Address;
    /** Results of Authentication such as 3D Secure. */
    authenticationResult?: AuthenticationResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const googlePayCardResponseInternalSchema: Schema<GooglePayCardResponse>;
export declare const googlePayCardResponseSchema: Schema<GooglePayCardResponse>;
