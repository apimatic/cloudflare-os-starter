import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Address } from "./address.js";
import { type Name } from "./name.js";
import { type PhoneWithType } from "./phone-with-type.js";
import { type TaxInfo } from "./tax-info.js";
/** The customer who approves and pays for the order. The customer is also known as the payer. */
export type Payer = {
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    emailAddress?: string;
    /** The account identifier for a PayPal account. */
    payerId?: string;
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
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const payerInternalSchema: Schema<Payer>;
export declare const payerSchema: Schema<Payer>;
