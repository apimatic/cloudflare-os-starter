import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Information used to pay using iDEAL. */
export type IDealPaymentObject = {
    /** The full name representation like Mr J Smith. */
    name?: string;
    /**
     * The [two-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
     * country or region. Note: The country code for Great Britain is GB and not UK as used in the
     * top-level domain names for that country. Use the `C2` country code for China worldwide for
     * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
     */
    countryCode?: string;
    /**
     * The business identification code (BIC). In payments systems, a BIC is used to identify a
     * specific business, most commonly a bank.
     */
    bic?: string;
    /** The last characters of the IBAN used to pay. */
    ibanLastChars?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const iDealPaymentObjectInternalSchema: Schema<IDealPaymentObject>;
export declare const iDealPaymentObjectSchema: Schema<IDealPaymentObject>;
