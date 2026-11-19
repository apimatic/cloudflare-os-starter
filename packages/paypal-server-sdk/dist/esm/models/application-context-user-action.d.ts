import type { EnumSchema } from "../core/validation/schema.js";
/**
 * Configures the label name to `Continue` or `Subscribe Now` for subscription consent experience.
 */
export declare const ApplicationContextUserAction: {
    /**
     * After you redirect the customer to the PayPal subscription consent page, a Continue button
     * appears. Use this option when you want to control the activation of the subscription and do not
     * want PayPal to activate the subscription.
     */
    readonly Continue: "CONTINUE";
    /**
     * After you redirect the customer to the PayPal subscription consent page, a Subscribe Now button
     * appears. Use this option when you want PayPal to activate the subscription.
     */
    readonly SubscribeNow: "SUBSCRIBE_NOW";
};
export type ApplicationContextUserAction = (typeof ApplicationContextUserAction)[keyof typeof ApplicationContextUserAction] | (string & {});
export declare const applicationContextUserActionSchema: EnumSchema<ApplicationContextUserAction>;
