import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type GooglePayCardResponse } from "./google-pay-card-response.js";
import { type PhoneNumberWithCountryCode } from "./phone-number-with-country-code.js";
/** Google Pay Wallet payment data. */
export type GooglePayWalletResponse = {
    /** The full name representation like Mr J Smith. */
    name?: string;
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    emailAddress?: string;
    /**
     * The phone number in its canonical international [E.164 numbering plan
     * format](https://www.itu.int/rec/T-REC-E.164/en).
     */
    phoneNumber?: PhoneNumberWithCountryCode;
    /**
     * The payment card to use to fund a Google Pay payment response. Can be a credit or debit card.
     */
    card?: GooglePayCardResponse;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const googlePayWalletResponseInternalSchema: Schema<GooglePayWalletResponse>;
export declare const googlePayWalletResponseSchema: Schema<GooglePayWalletResponse>;
