import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Address } from "./address.js";
import { type CardBrand } from "./card-brand.js";
/** A Resource representing a request to vault a Card. */
export type PaymentTokenRequestCard = {
    /** The card holder's name as it appears on the card. */
    name?: string;
    /** The primary account number (PAN) for the payment card. */
    number?: string;
    /**
     * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6).
     */
    expiry?: string;
    /**
     * The three- or four-digit security code of the card. Also known as the CVV, CVC, CVN, CVE, or
     * CID. This parameter cannot be present in the request when `payment_initiator=MERCHANT`.
     */
    securityCode?: string;
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
export declare const paymentTokenRequestCardInternalSchema: Schema<PaymentTokenRequestCard>;
export declare const paymentTokenRequestCardSchema: Schema<PaymentTokenRequestCard>;
