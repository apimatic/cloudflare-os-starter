import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AvsCode } from "./avs-code.js";
import { type CvvCode } from "./cvv-code.js";
import { type PaymentAdviceCode } from "./payment-advice-code.js";
import { type ProcessorResponseCode } from "./processor-response-code.js";
/**
 * The processor response information for payment requests, such as direct credit card transactions.
 */
export type ProcessorResponse = {
    /**
     * The address verification code for Visa, Discover, Mastercard, or American Express transactions.
     */
    avsCode?: AvsCode;
    /** The card verification value code for for Visa, Discover, Mastercard, or American Express. */
    cvvCode?: CvvCode;
    /** Processor response code for the non-PayPal payment processor errors. */
    responseCode?: ProcessorResponseCode;
    /**
     * The declined payment transactions might have payment advice codes. The card networks, like Visa
     * and Mastercard, return payment advice codes.
     */
    paymentAdviceCode?: PaymentAdviceCode;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const processorResponseSchema: Schema<ProcessorResponse>;
