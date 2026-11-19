import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Information used to pay using BLIK one-click flow. */
export type BlikOneClickPaymentRequest = {
    /** The 6-digit code used to authenticate a consumer within BLIK. */
    authCode?: string;
    /**
     * The merchant generated, unique reference serving as a primary identifier for accounts connected
     * between Blik and a merchant.
     */
    consumerReference: string;
    /**
     * A bank defined identifier used as a display name to allow the payer to differentiate between
     * multiple registered bank accounts.
     */
    aliasLabel?: string;
    /**
     * A Blik-defined identifier for a specific Blik-enabled bank account that is associated with a
     * given merchant. Used only in conjunction with a Consumer Reference.
     */
    aliasKey?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const blikOneClickPaymentRequestInternalSchema: Schema<BlikOneClickPaymentRequest>;
export declare const blikOneClickPaymentRequestSchema: Schema<BlikOneClickPaymentRequest>;
