import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CheckoutPaymentIntent } from "./checkout-payment-intent.js";
import { type OrderApplicationContext } from "./order-application-context.js";
import { type Payer } from "./payer.js";
import { type PaymentSource } from "./payment-source.js";
import { type PurchaseUnitRequest } from "./purchase-unit-request.js";
/** The order request details. */
export type OrderRequest = {
    /**
     * The intent to either capture payment immediately or authorize a payment for an order after
     * order creation.
     */
    intent: CheckoutPaymentIntent;
    /**
     * DEPRECATED. The customer is also known as the payer. The Payer object was intended to only be
     * used with the `payment_source.paypal` object. In order to make this design more clear, the
     * details in the `payer` object are now available under `payment_source.paypal`. Please use
     * `payment_source.paypal`.
     *
     * @deprecated
     */
    payer?: Payer;
    /**
     * An array of purchase units. Each purchase unit establishes a contract between a payer and the
     * payee. Each purchase unit represents either a full or partial order that the payer intends to
     * purchase from the payee.
     */
    purchaseUnits: PurchaseUnitRequest[];
    /** The payment source definition. */
    paymentSource?: PaymentSource;
    /**
     * Customizes the payer experience during the approval process for the payment with PayPal. Note:
     * Partners and Marketplaces might configure brand_name and shipping_preference during partner
     * account setup, which overrides the request values.
     */
    applicationContext?: OrderApplicationContext;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderRequestInternalSchema: Schema<OrderRequest>;
export declare const orderRequestSchema: Schema<OrderRequest>;
