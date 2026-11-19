import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CardBrand } from "./card-brand.js";
import { type CardVerificationProcessorResponse } from "./card-verification-processor-response.js";
import { type Money } from "./money.js";
/** Card Verification details including the authorization details and 3D SECURE details. */
export type CardVerificationDetails = {
    /**
     * DEPRECATED. This field is DEPRECATED. Please find the network transaction id data in the 'id'
     * field under the 'network_transaction_reference' object instead of the 'verification' object.
     *
     * @deprecated
     */
    networkTransactionId?: string;
    /**
     * DEPRECATED. This field is DEPRECATED. Please find the date data in the 'date' field under the
     * 'network_transaction_reference' object instead of the 'verification' object.
     *
     * @deprecated
     */
    date?: string;
    /**
     * DEPRECATED. This field is DEPRECATED. Please find the network data in the 'network' field under
     * the 'network_transaction_reference' object instead of the 'verification' object.
     *
     * @deprecated
     */
    network?: CardBrand;
    /**
     * DEPRECATED. This field is DEPRECATED. Please find the time data in the 'time' field under the
     * 'network_transaction_reference' object instead of the 'verification' object.
     *
     * @deprecated
     */
    time?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount?: Money;
    /**
     * The processor response information for payment requests, such as direct credit card
     * transactions.
     */
    processorResponse?: CardVerificationProcessorResponse;
    /**
     * DEPRECATED. This field is DEPRECATED. Please find the 3D secure authentication data in the
     * 'three_d_secure' object under the 'authentication_result' object instead of the 'verification'
     * object.
     *
     * @deprecated
     */
    threeDSecure?: Record<string, unknown>;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardVerificationDetailsInternalSchema: Schema<CardVerificationDetails>;
export declare const cardVerificationDetailsSchema: Schema<CardVerificationDetails>;
