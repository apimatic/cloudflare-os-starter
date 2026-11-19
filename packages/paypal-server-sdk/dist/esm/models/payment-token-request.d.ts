import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Customer } from "./customer.js";
import { type PaymentTokenRequestPaymentSource } from "./payment-token-request-payment-source.js";
/** Payment Token Request where the `source` defines the type of instrument to be stored. */
export type PaymentTokenRequest = {
    /**
     * This object defines a customer in your system. Use it to manage customer profiles, save payment
     * methods and contact details.
     */
    customer?: Customer;
    /** The payment method to vault with the instrument details. */
    paymentSource: PaymentTokenRequestPaymentSource;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentTokenRequestInternalSchema: Schema<PaymentTokenRequest>;
export declare const paymentTokenRequestSchema: Schema<PaymentTokenRequest>;
