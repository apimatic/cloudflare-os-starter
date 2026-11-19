import type { EnumSchema } from "../core/validation/schema.js";
/** The status of the payment token. */
export declare const PaymentTokenStatus: {
    /**
     * A setup token is initialized with minimal information, more data must be added to the
     * setup-token to be vaulted
     */
    readonly Created: "CREATED";
    /** A contingency on payer approval is required before the payment method can be saved. */
    readonly PayerActionRequired: "PAYER_ACTION_REQUIRED";
    /**
     * Setup token is ready to be vaulted. If a buyer approval contigency was returned, it is has been
     * approved.
     */
    readonly Approved: "APPROVED";
    /** The payment token has been vaulted. */
    readonly Vaulted: "VAULTED";
    /** A vaulted payment method token has been tokenized for short term (one time) use. */
    readonly Tokenized: "TOKENIZED";
};
export type PaymentTokenStatus = (typeof PaymentTokenStatus)[keyof typeof PaymentTokenStatus] | (string & {});
export declare const paymentTokenStatusSchema: EnumSchema<PaymentTokenStatus>;
