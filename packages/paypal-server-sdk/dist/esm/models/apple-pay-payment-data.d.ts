import type { JsonValue, Schema } from "../core/validation/schema.js";
/**
 * Information about the decrypted apple pay payment data for the token like cryptogram, eci
 * indicator.
 */
export type ApplePayPaymentData = {
    /**
     * Online payment cryptogram, as defined by 3D Secure. The pattern is defined by an external party
     * and supports Unicode.
     */
    cryptogram?: string;
    /**
     * ECI indicator, as defined by 3- Secure. The pattern is defined by an external party and
     * supports Unicode.
     */
    eciIndicator?: string;
    /**
     * Encoded Apple Pay EMV Payment Structure used for payments in China. The pattern is defined by
     * an external party and supports Unicode.
     */
    emvData?: string;
    /**
     * Bank Key encrypted Apple Pay PIN. The pattern is defined by an external party and supports
     * Unicode.
     */
    pin?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const applePayPaymentDataInternalSchema: Schema<ApplePayPaymentData>;
export declare const applePayPaymentDataSchema: Schema<ApplePayPaymentData>;
