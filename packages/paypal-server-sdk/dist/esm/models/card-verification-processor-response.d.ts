import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AvsCode } from "./avs-code.js";
import { type CvvCode } from "./cvv-code.js";
/**
 * The processor response information for payment requests, such as direct credit card transactions.
 */
export type CardVerificationProcessorResponse = {
    /**
     * The address verification code for Visa, Discover, Mastercard, or American Express transactions.
     */
    avsCode?: AvsCode;
    /** The card verification value code for for Visa, Discover, Mastercard, or American Express. */
    cvvCode?: CvvCode;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardVerificationProcessorResponseSchema: Schema<CardVerificationProcessorResponse>;
