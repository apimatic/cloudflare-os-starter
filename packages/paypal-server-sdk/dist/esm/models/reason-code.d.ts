import type { EnumSchema } from "../core/validation/schema.js";
/** The reason code for the payment failure. */
export declare const ReasonCode: {
    /** PayPal declined the payment due to one or more customer issues. */
    readonly PaymentDenied: "PAYMENT_DENIED";
    /** An internal server error has occurred. */
    readonly InternalServerError: "INTERNAL_SERVER_ERROR";
    /** The payee account is not in good standing and cannot receive payments. */
    readonly PayeeAccountRestricted: "PAYEE_ACCOUNT_RESTRICTED";
    /** The payer account is not in good standing and cannot make payments. */
    readonly PayerAccountRestricted: "PAYER_ACCOUNT_RESTRICTED";
    /** Payer cannot pay for this transaction. */
    readonly PayerCannotPay: "PAYER_CANNOT_PAY";
    /** The transaction exceeds the payer's sending limit. */
    readonly SendingLimitExceeded: "SENDING_LIMIT_EXCEEDED";
    /** The transaction exceeds the receiver's receiving limit. */
    readonly TransactionReceivingLimitExceeded: "TRANSACTION_RECEIVING_LIMIT_EXCEEDED";
    /** The transaction is declined due to a currency mismatch. */
    readonly CurrencyMismatch: "CURRENCY_MISMATCH";
};
export type ReasonCode = (typeof ReasonCode)[keyof typeof ReasonCode] | (string & {});
export declare const reasonCodeSchema: EnumSchema<ReasonCode>;
