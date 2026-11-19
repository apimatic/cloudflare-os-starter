import type { EnumSchema } from "../core/validation/schema.js";
/** CallBack event. */
export declare const CallbackEvents: {
    /**
     * When Buyer changes or selects the shipping address on the PayPal/Venmo buyer approval flow ,
     * PayPal/Venmo will call merchant with the callback URL to update order totals.
     */
    readonly ShippingAddress: "SHIPPING_ADDRESS";
    /**
     * When Buyer changes or selects the shipping options on the PayPal/Venmo buyer approval flow ,
     * PayPal/Venmo will call merchant with the callback URL to update order totals.
     */
    readonly ShippingOptions: "SHIPPING_OPTIONS";
};
export type CallbackEvents = (typeof CallbackEvents)[keyof typeof CallbackEvents] | (string & {});
export declare const callbackEventsSchema: EnumSchema<CallbackEvents>;
