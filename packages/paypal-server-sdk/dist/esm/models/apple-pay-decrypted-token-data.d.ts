import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ApplePayPaymentDataType } from "./apple-pay-payment-data-type.js";
import { type ApplePayPaymentData } from "./apple-pay-payment-data.js";
import { type ApplePayTokenizedCard } from "./apple-pay-tokenized-card.js";
import { type Money } from "./money.js";
/** Information about the Payment data obtained by decrypting Apple Pay token. */
export type ApplePayDecryptedTokenData = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    transactionAmount?: Money;
    /** The payment card to use to fund a payment. Can be a credit or debit card. */
    tokenizedCard: ApplePayTokenizedCard;
    /**
     * Apple Pay Hex-encoded device manufacturer identifier. The pattern is defined by an external
     * party and supports Unicode.
     */
    deviceManufacturerId?: string;
    /**
     * Indicates the type of payment data passed, in case of Non China the payment data is 3DSECURE
     * and for China it is EMV.
     */
    paymentDataType?: ApplePayPaymentDataType;
    /**
     * Information about the decrypted apple pay payment data for the token like cryptogram, eci
     * indicator.
     */
    paymentData?: ApplePayPaymentData;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const applePayDecryptedTokenDataInternalSchema: Schema<ApplePayDecryptedTokenData>;
export declare const applePayDecryptedTokenDataSchema: Schema<ApplePayDecryptedTokenData>;
