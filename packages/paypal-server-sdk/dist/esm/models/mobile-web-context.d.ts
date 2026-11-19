import type { JsonValue, Schema } from "../core/validation/schema.js";
import { MobileReturnFlow } from "./mobile-return-flow.js";
/** Buyer's mobile web browser context to app switch to the PayPal consumer app. */
export type MobileWebContext = {
    /**
     * Merchant preference on how the buyer can navigate back to merchant website post approving the
     * transaction on the PayPal App.
     *
     * @default MobileReturnFlow.Auto
     */
    returnFlow?: MobileReturnFlow;
    /**
     * User agent from the request originating from the buyer's device. This will be used to identify
     * the buyer's operating system and browser versions. NOTE: Merchants must not alter or modify the
     * buyer's device user agent.
     */
    buyerUserAgent?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const mobileWebContextInternalSchema: Schema<MobileWebContext>;
export declare const mobileWebContextSchema: Schema<MobileWebContext>;
