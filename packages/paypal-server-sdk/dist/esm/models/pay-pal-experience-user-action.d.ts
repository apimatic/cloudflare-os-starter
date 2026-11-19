import type { EnumSchema } from "../core/validation/schema.js";
/** Configures a Continue or Pay Now checkout flow. */
export declare const PayPalExperienceUserAction: {
    /**
     * After you redirect the customer to the PayPal payment page, a Continue button appears. Use this
     * option when the final amount is not known when the checkout flow is initiated and you want to
     * redirect the customer to the merchant page without processing the payment.
     */
    readonly Continue: "CONTINUE";
    /**
     * After you redirect the customer to the PayPal payment page, a Pay Now button appears. Use this
     * option when the final amount is known when the checkout is initiated and you want to process
     * the payment immediately when the customer clicks Pay Now.
     */
    readonly PayNow: "PAY_NOW";
};
export type PayPalExperienceUserAction = (typeof PayPalExperienceUserAction)[keyof typeof PayPalExperienceUserAction] | (string & {});
export declare const payPalExperienceUserActionSchema: EnumSchema<PayPalExperienceUserAction>;
