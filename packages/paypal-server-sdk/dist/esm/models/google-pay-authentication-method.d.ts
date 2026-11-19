import type { EnumSchema } from "../core/validation/schema.js";
/** Authentication Method which is used for the card transaction. */
export declare const GooglePayAuthenticationMethod: {
    /**
     * This authentication method is associated with payment cards stored on file with the user's
     * Google Account. Returned payment data includes primary account number (PAN) with the expiration
     * month and the expiration year.
     */
    readonly PanOnly: "PAN_ONLY";
    /**
     * Returned payment data includes a 3-D Secure (3DS) cryptogram generated on the device. -> If
     * authentication_method=CRYPTOGRAM, it is required that 'cryptogram' parameter in the request has
     * a valid 3-D Secure (3DS) cryptogram generated on the device.
     */
    readonly Cryptogram3Ds: "CRYPTOGRAM_3DS";
};
export type GooglePayAuthenticationMethod = (typeof GooglePayAuthenticationMethod)[keyof typeof GooglePayAuthenticationMethod] | (string & {});
export declare const googlePayAuthenticationMethodSchema: EnumSchema<GooglePayAuthenticationMethod>;
