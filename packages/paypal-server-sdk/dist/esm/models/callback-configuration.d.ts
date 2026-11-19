import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CallbackEvents } from "./callback-events.js";
/** CallBack Configuration that the merchant can provide to PayPal/Venmo. */
export type CallbackConfiguration = {
    /** An array of callback events merchant can subscribe to for the corresponding callback url. */
    callbackEvents: CallbackEvents[];
    /**
     * Merchant provided CallBack url.PayPal/Venmo will use this url to call the merchant back when
     * the events occur .PayPal/Venmo expects a secured url usually in the https format.merchant can
     * append the cart id or other params part of the url as query or path params.
     */
    callbackUrl: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const callbackConfigurationInternalSchema: Schema<CallbackConfiguration>;
export declare const callbackConfigurationSchema: Schema<CallbackConfiguration>;
