import * as s from "../core/validation/index.js";
/** CallBack event. */
export const CallbackEvents = {
    /**
     * When Buyer changes or selects the shipping address on the PayPal/Venmo buyer approval flow ,
     * PayPal/Venmo will call merchant with the callback URL to update order totals.
     */
    ShippingAddress: "SHIPPING_ADDRESS",
    /**
     * When Buyer changes or selects the shipping options on the PayPal/Venmo buyer approval flow ,
     * PayPal/Venmo will call merchant with the callback URL to update order totals.
     */
    ShippingOptions: "SHIPPING_OPTIONS",
};
export const callbackEventsSchema = s.enumOf(CallbackEvents);
//# sourceMappingURL=callback-events.js.map