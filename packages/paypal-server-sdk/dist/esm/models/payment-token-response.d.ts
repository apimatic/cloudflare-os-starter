import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CustomerResponse } from "./customer-response.js";
import { type LinkDescription } from "./link-description.js";
import { type PaymentTokenResponsePaymentSource } from "./payment-token-response-payment-source.js";
/** Full representation of a saved payment token. */
export type PaymentTokenResponse = {
    /**
     * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
     * merchant's server so the saved payment source can be used for future transactions.
     */
    id?: string;
    /** Customer in merchant's or partner's system of records. */
    customer?: CustomerResponse;
    /** The vaulted payment method details. */
    paymentSource?: PaymentTokenResponsePaymentSource;
    /** An array of related [HATEOAS links](/api/rest/responses/#hateoas). */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentTokenResponseInternalSchema: Schema<PaymentTokenResponse>;
export declare const paymentTokenResponseSchema: Schema<PaymentTokenResponse>;
