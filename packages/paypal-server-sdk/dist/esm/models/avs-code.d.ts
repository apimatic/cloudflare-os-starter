import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The address verification code for Visa, Discover, Mastercard, or American Express transactions.
 */
export declare const AvsCode: {
    /**
     * For Visa, Mastercard, or Discover transactions, the address matches but the zip code does not
     * match. For American Express transactions, the card holder address is correct.
     */
    readonly A: "A";
    /** For Visa, Mastercard, or Discover transactions, the address matches. International A. */
    readonly B: "B";
    /** For Visa, Mastercard, or Discover transactions, no values match. International N. */
    readonly C: "C";
    /**
     * For Visa, Mastercard, or Discover transactions, the address and postal code match.
     * International X.
     */
    readonly D: "D";
    /**
     * For Visa, Mastercard, or Discover transactions, not allowed for Internet or phone transactions.
     * For American Express card holder, the name is incorrect but the address and postal code match.
     */
    readonly E: "E";
    /**
     * For Visa, Mastercard, or Discover transactions, the address and postal code match. UK-specific
     * X. For American Express card holder, the name is incorrect but the address matches.
     */
    readonly F: "F";
    /** For Visa, Mastercard, or Discover transactions, global is unavailable. Nothing matches. */
    readonly G: "G";
    /**
     * For Visa, Mastercard, or Discover transactions, international is unavailable. Not applicable.
     */
    readonly I: "I";
    /**
     * For Visa, Mastercard, or Discover transactions, the address and postal code match. For American
     * Express card holder, the name, address, and postal code match.
     */
    readonly M: "M";
    /**
     * For Visa, Mastercard, or Discover transactions, nothing matches. For American Express card
     * holder, the address and postal code are both incorrect.
     */
    readonly N: "N";
    /** For Visa, Mastercard, or Discover transactions, postal international Z. Postal code only. */
    readonly P: "P";
    /**
     * For Visa, Mastercard, or Discover transactions, re-try the request. For American Express, the
     * system is unavailable.
     */
    readonly R: "R";
    /** For Visa, Mastercard, Discover, or American Express, the service is not supported. */
    readonly S: "S";
    /**
     * For Visa, Mastercard, or Discover transactions, the service is unavailable. For American
     * Express, information is not available. For Maestro, the address is not checked or the acquirer
     * had no response. The service is not available.
     */
    readonly U: "U";
    /**
     * For Visa, Mastercard, or Discover transactions, whole ZIP code. For American Express, the card
     * holder name, address, and postal code are all incorrect.
     */
    readonly W: "W";
    /**
     * For Visa, Mastercard, or Discover transactions, exact match of the address and the nine-digit
     * ZIP code. For American Express, the card holder name, address, and postal code are all
     * incorrect.
     */
    readonly X: "X";
    /**
     * For Visa, Mastercard, or Discover transactions, the address and five-digit ZIP code match. For
     * American Express, the card holder address and postal code are both correct.
     */
    readonly Y: "Y";
    /**
     * For Visa, Mastercard, or Discover transactions, the five-digit ZIP code matches but no address.
     * For American Express, only the card holder postal code is correct.
     */
    readonly Z: "Z";
    /** For Maestro, no AVS response was obtained. */
    readonly Null: "Null";
    /** For Maestro, all address information matches. */
    readonly _0: "0";
    /** For Maestro, none of the address information matches. */
    readonly _1: "1";
    /** For Maestro, part of the address information matches. */
    readonly _2: "2";
    /** For Maestro, the merchant did not provide AVS information. It was not processed. */
    readonly _3: "3";
    /**
     * For Maestro, the address was not checked or the acquirer had no response. The service is not
     * available.
     */
    readonly _4: "4";
};
export type AvsCode = (typeof AvsCode)[keyof typeof AvsCode] | (string & {});
export declare const avsCodeSchema: EnumSchema<AvsCode>;
