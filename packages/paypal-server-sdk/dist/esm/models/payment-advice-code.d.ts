import type { EnumSchema } from "../core/validation/schema.js";
/**
 * The declined payment transactions might have payment advice codes. The card networks, like Visa
 * and Mastercard, return payment advice codes.
 */
export declare const PaymentAdviceCode: {
    /**
     * For Mastercard, expired card account upgrade or portfolio sale conversion. Obtain new account
     * information before next billing cycle.
     */
    readonly _01: "01";
    /**
     * For Mastercard, over credit limit or insufficient funds. Retry the transaction 72 hours later.
     * For Visa, the card holder wants to stop only one specific payment in the recurring payment
     * relationship. The merchant must NOT resubmit the same transaction. The merchant can continue
     * the billing process in the subsequent billing period.
     */
    readonly _02: "02";
    /**
     * For Mastercard, account closed as fraudulent. Obtain another type of payment from customer due
     * to account being closed or fraud. Possible reason: Account closed as fraudulent. For Visa, the
     * card holder wants to stop all recurring payment transactions for a specific merchant. Stop
     * recurring payment requests.
     */
    readonly _03: "03";
    /** For Mastercard, token requirements not fulfilled for this token type. */
    readonly _04: "04";
    /**
     * For Mastercard, the card holder has been unsuccessful at canceling recurring payment through
     * merchant. Stop recurring payment requests. For Visa, all recurring payments were canceled for
     * the card number requested. Stop recurring payment requests.
     */
    readonly _21: "21";
    /** For Mastercard, merchant does not qualify for product code. */
    readonly _22: "22";
    /** For Mastercard, retry after 1 hour. */
    readonly _24: "24";
    /** For Mastercard, retry after 24 hours. */
    readonly _25: "25";
    /** For Mastercard, retry after 2 days. */
    readonly _26: "26";
    /** For Mastercard, retry after 4 days. */
    readonly _27: "27";
    /** For Mastercard, retry after 6 days. */
    readonly _28: "28";
    /** For Mastercard, retry after 8 days. */
    readonly _29: "29";
    /** For Mastercard, retry after 10 days . */
    readonly _30: "30";
    /** For Mastercard, consumer non-reloadable prepaid card. */
    readonly _40: "40";
    /** For Mastercard, consumer multi-use virtual card number. */
    readonly _43: "43";
};
export type PaymentAdviceCode = (typeof PaymentAdviceCode)[keyof typeof PaymentAdviceCode] | (string & {});
export declare const paymentAdviceCodeSchema: EnumSchema<PaymentAdviceCode>;
