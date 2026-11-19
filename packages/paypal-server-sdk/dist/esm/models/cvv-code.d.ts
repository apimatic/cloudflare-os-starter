import type { EnumSchema } from "../core/validation/schema.js";
/** The card verification value code for for Visa, Discover, Mastercard, or American Express. */
export declare const CvvCode: {
    /**
     * For Visa, Mastercard, Discover, or American Express, error - unrecognized or unknown response.
     */
    readonly E: "E";
    /** For Visa, Mastercard, Discover, or American Express, invalid or null. */
    readonly I: "I";
    /** For Visa, Mastercard, Discover, or American Express, the CVV2/CSC matches. */
    readonly M: "M";
    /** For Visa, Mastercard, Discover, or American Express, the CVV2/CSC does not match. */
    readonly N: "N";
    /** For Visa, Mastercard, Discover, or American Express, it was not processed. */
    readonly P: "P";
    /** For Visa, Mastercard, Discover, or American Express, the service is not supported. */
    readonly S: "S";
    /** For Visa, Mastercard, Discover, or American Express, unknown - the issuer is not certified. */
    readonly U: "U";
    /**
     * For Visa, Mastercard, Discover, or American Express, no response. For Maestro, the service is
     * not available.
     */
    readonly X: "X";
    /** For Visa, Mastercard, Discover, or American Express, error. */
    readonly AllOthers: "All others";
    /** For Maestro, the CVV2 matched. */
    readonly _0: "0";
    /** For Maestro, the CVV2 did not match. */
    readonly _1: "1";
    /** For Maestro, the merchant has not implemented CVV2 code handling. */
    readonly _2: "2";
    /** For Maestro, the merchant has indicated that CVV2 is not present on card. */
    readonly _3: "3";
    /** For Maestro, the service is not available. */
    readonly _4: "4";
};
export type CvvCode = (typeof CvvCode)[keyof typeof CvvCode] | (string & {});
export declare const cvvCodeSchema: EnumSchema<CvvCode>;
