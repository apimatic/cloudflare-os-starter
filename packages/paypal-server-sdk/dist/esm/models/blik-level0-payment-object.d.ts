import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Information used to pay using BLIK level_0 flow. */
export type BlikLevel0PaymentObject = {
    /** The 6-digit code used to authenticate a consumer within BLIK. */
    authCode: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const blikLevel0PaymentObjectInternalSchema: Schema<BlikLevel0PaymentObject>;
export declare const blikLevel0PaymentObjectSchema: Schema<BlikLevel0PaymentObject>;
