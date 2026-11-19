import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type OrderConfirmApplicationContext } from "./order-confirm-application-context.js";
import { type PaymentSource } from "./payment-source.js";
/** Payer confirms the intent to pay for the Order using the provided payment source. */
export type ConfirmOrderRequest = {
    /** The payment source definition. */
    paymentSource: PaymentSource;
    /** Customizes the payer confirmation experience. */
    applicationContext?: OrderConfirmApplicationContext;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const confirmOrderRequestInternalSchema: Schema<ConfirmOrderRequest>;
export declare const confirmOrderRequestSchema: Schema<ConfirmOrderRequest>;
