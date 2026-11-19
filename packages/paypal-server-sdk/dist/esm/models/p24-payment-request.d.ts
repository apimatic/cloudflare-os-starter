import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ExperienceContext } from "./experience-context.js";
/** Information needed to pay using P24 (Przelewy24). */
export type P24PaymentRequest = {
    /** The full name representation like Mr J Smith. */
    name: string;
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    email: string;
    /**
     * The [two-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
     * country or region. Note: The country code for Great Britain is GB and not UK as used in the
     * top-level domain names for that country. Use the `C2` country code for China worldwide for
     * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
     */
    countryCode: string;
    /** Customizes the payer experience during the approval process for the payment. */
    experienceContext?: ExperienceContext;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const p24PaymentRequestInternalSchema: Schema<P24PaymentRequest>;
export declare const p24PaymentRequestSchema: Schema<P24PaymentRequest>;
