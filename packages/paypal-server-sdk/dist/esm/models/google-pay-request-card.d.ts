import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Address } from "./address.js";
import { type CardBrand } from "./card-brand.js";
import { type CardType } from "./card-type.js";
/** The payment card used to fund a Google Pay payment. Can be a credit or debit card. */
export type GooglePayRequestCard = {
    /** The card holder's name as it appears on the card. */
    name?: string;
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
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const googlePayRequestCardInternalSchema: Schema<GooglePayRequestCard>;
export declare const googlePayRequestCardSchema: Schema<GooglePayRequestCard>;
