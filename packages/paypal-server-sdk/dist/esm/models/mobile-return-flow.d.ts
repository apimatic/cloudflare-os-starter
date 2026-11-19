import type { EnumSchema } from "../core/validation/schema.js";
/**
 * Merchant preference on how the buyer can navigate back to merchant website post approving the
 * transaction on the PayPal App.
 */
export declare const MobileReturnFlow: {
    /**
     * After payment approval in the PayPal App, buyer will automatically be redirected to the
     * merchant website.
     */
    readonly Auto: "AUTO";
    /**
     * After payment approval in the PayPal App, buyer will be asked to manually navigate back to the
     * merchant website where they started the transaction from. The buyer is shown a message like
     * 'Return to Merchant' to return to the source where the transaction actually started.
     */
    readonly Manual: "MANUAL";
};
export type MobileReturnFlow = (typeof MobileReturnFlow)[keyof typeof MobileReturnFlow] | (string & {});
export declare const mobileReturnFlowSchema: EnumSchema<MobileReturnFlow>;
