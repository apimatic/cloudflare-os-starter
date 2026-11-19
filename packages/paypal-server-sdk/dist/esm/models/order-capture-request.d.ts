import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type OrderCaptureRequestPaymentSource } from "./order-capture-request-payment-source.js";
/** Completes an capture payment for an order. */
export type OrderCaptureRequest = {
    /** The payment source definition. */
    paymentSource?: OrderCaptureRequestPaymentSource;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderCaptureRequestInternalSchema: Schema<OrderCaptureRequest>;
export declare const orderCaptureRequestSchema: Schema<OrderCaptureRequest>;
