import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Customer } from "./customer.js";
import { type SetupTokenRequestPaymentSource } from "./setup-token-request-payment-source.js";
/** Setup Token Request where the `source` defines the type of instrument to be stored. */
export type SetupTokenRequest = {
    /**
     * This object defines a customer in your system. Use it to manage customer profiles, save payment
     * methods and contact details.
     */
    customer?: Customer;
    /** The payment method to vault with the instrument details. */
    paymentSource: SetupTokenRequestPaymentSource;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const setupTokenRequestInternalSchema: Schema<SetupTokenRequest>;
export declare const setupTokenRequestSchema: Schema<SetupTokenRequest>;
