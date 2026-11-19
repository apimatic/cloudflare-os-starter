import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type MobileWebContext } from "./mobile-web-context.js";
import { type NativeAppContext } from "./native-app-context.js";
/**
 * Merchant provided details of the native app or mobile web browser to facilitate buyer's app
 * switch to the PayPal consumer app.
 */
export type AppSwitchContext = {
    /** Merchant provided, buyer's native app preferences to app switch to the PayPal consumer app. */
    nativeApp?: NativeAppContext;
    /** Buyer's mobile web browser context to app switch to the PayPal consumer app. */
    mobileWeb?: MobileWebContext;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const appSwitchContextInternalSchema: Schema<AppSwitchContext>;
export declare const appSwitchContextSchema: Schema<AppSwitchContext>;
