import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Information used to pay using BLIK one-click flow. */
export type BlikOneClickPaymentObject = {
    /**
     * The merchant generated, unique reference serving as a primary identifier for accounts connected
     * between Blik and a merchant.
     */
    consumerReference?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const blikOneClickPaymentObjectInternalSchema: Schema<BlikOneClickPaymentObject>;
export declare const blikOneClickPaymentObjectSchema: Schema<BlikOneClickPaymentObject>;
