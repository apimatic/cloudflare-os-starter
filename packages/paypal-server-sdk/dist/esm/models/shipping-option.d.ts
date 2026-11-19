import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type ShippingType } from "./shipping-type.js";
/** The options that the payee or merchant offers to the payer to ship or pick up their items. */
export type ShippingOption = {
    /** A unique ID that identifies a payer-selected shipping option. */
    id: string;
    /**
     * A description that the payer sees, which helps them choose an appropriate shipping option. For
     * example, `Free Shipping`, `USPS Priority Shipping`, `Expédition prioritaire USPS`, or `USPS
     * yōuxiān fā huò`. Localize this description to the payer's locale.
     */
    label: string;
    /** A classification for the method of purchase fulfillment. */
    type?: ShippingType;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount?: Money;
    /**
     * If the API request sets `selected = true`, it represents the shipping option that the payee or
     * merchant expects to be pre-selected for the payer when they first view the `shipping.options`
     * in the PayPal Checkout experience. As part of the response if a `shipping.option` contains
     * `selected=true`, it represents the shipping option that the payer selected during the course of
     * checkout with PayPal. Only one `shipping.option` can be set to `selected=true`.
     */
    selected: boolean;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const shippingOptionInternalSchema: Schema<ShippingOption>;
export declare const shippingOptionSchema: Schema<ShippingOption>;
