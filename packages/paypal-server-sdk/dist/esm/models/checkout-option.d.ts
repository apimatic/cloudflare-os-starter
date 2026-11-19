import type { JsonValue, Schema } from "../core/validation/schema.js";
/** A checkout option as a name-and-value pair. */
export type CheckoutOption = {
    /** The checkout option name, such as `color` or `texture`. */
    checkoutOptionName?: string;
    /**
     * The checkout option value. For example, the checkout option `color` might be `blue` or `red`
     * while the checkout option `texture` might be `smooth` or `rippled`.
     */
    checkoutOptionValue?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const checkoutOptionInternalSchema: Schema<CheckoutOption>;
export declare const checkoutOptionSchema: Schema<CheckoutOption>;
