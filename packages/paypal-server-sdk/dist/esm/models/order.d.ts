import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CheckoutPaymentIntent } from "./checkout-payment-intent.js";
import { type LinkDescription } from "./link-description.js";
import { type OrderStatus } from "./order-status.js";
import { type Payer } from "./payer.js";
import { type PaymentSourceResponse } from "./payment-source-response.js";
import { type PurchaseUnit } from "./purchase-unit.js";
/** The order details. */
export type Order = {
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    createTime?: string;
    /**
     * The date and time, in [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
     * seconds are optional. Note: The regular expression provides guidance but does not reject all
     * invalid dates.
     */
    updateTime?: string;
    /** The ID of the order. */
    id?: string;
    /** The payment source used to fund the payment. */
    paymentSource?: PaymentSourceResponse;
    /**
     * The intent to either capture payment immediately or authorize a payment for an order after
     * order creation.
     */
    intent?: CheckoutPaymentIntent;
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
     * An array of purchase units. Each purchase unit establishes a contract between a customer and
     * merchant. Each purchase unit represents either a full or partial order that the customer
     * intends to purchase from the merchant.
     */
    purchaseUnits?: PurchaseUnit[];
    /** The order status. */
    status?: OrderStatus;
    /**
     * An array of request-related HATEOAS links. To complete payer approval, use the `approve` link
     * to redirect the payer. The API caller has 6 hours (default setting, this which can be changed
     * by your account manager to 24/48/72 hours to accommodate your use case) from the time the order
     * is created, to redirect your payer. Once redirected, the API caller has 6 hours for the payer
     * to approve the order and either authorize or capture the order. If you are not using the PayPal
     * JavaScript SDK to initiate PayPal Checkout (in context) ensure that you include
     * `application_context.return_url` is specified or you will get "We're sorry, Things don't appear
     * to be working at the moment" after the payer approves the payment.
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderInternalSchema: Schema<Order>;
export declare const orderSchema: Schema<Order>;
