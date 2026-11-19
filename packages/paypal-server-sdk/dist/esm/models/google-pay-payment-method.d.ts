import type { EnumSchema } from "../core/validation/schema.js";
/** The type of the payment credential. Currently, only CARD is supported. */
export declare const GooglePayPaymentMethod: {
    /** CARD is the only value that Google Pay accepts. */
    readonly Card: "CARD";
};
export type GooglePayPaymentMethod = (typeof GooglePayPaymentMethod)[keyof typeof GooglePayPaymentMethod] | (string & {});
export declare const googlePayPaymentMethodSchema: EnumSchema<GooglePayPaymentMethod>;
