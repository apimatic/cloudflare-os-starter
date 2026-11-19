import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type OrderAuthorizeRequestPaymentSource } from "./order-authorize-request-payment-source.js";
/** The authorization of an order request. */
export type OrderAuthorizeRequest = {
    /** The payment source definition. */
    paymentSource?: OrderAuthorizeRequestPaymentSource;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderAuthorizeRequestInternalSchema: Schema<OrderAuthorizeRequest>;
export declare const orderAuthorizeRequestSchema: Schema<OrderAuthorizeRequest>;
