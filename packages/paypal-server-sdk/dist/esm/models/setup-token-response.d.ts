import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Customer } from "./customer.js";
import { type LinkDescription } from "./link-description.js";
import { PaymentTokenStatus } from "./payment-token-status.js";
import { type SetupTokenResponsePaymentSource } from "./setup-token-response-payment-source.js";
/** Minimal representation of a cached setup token. */
export type SetupTokenResponse = {
    /**
     * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
     * merchant's server so the saved payment source can be used for future transactions.
     */
    id?: string;
    /**
     * This object defines a customer in your system. Use it to manage customer profiles, save payment
     * methods and contact details.
     */
    customer?: Customer;
    /** The status of the payment token. @default PaymentTokenStatus.Created */
    status?: PaymentTokenStatus;
    /** The setup payment method details. */
    paymentSource?: SetupTokenResponsePaymentSource;
    /** An array of related [HATEOAS links](/api/rest/responses/#hateoas). */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const setupTokenResponseInternalSchema: Schema<SetupTokenResponse>;
export declare const setupTokenResponseSchema: Schema<SetupTokenResponse>;
