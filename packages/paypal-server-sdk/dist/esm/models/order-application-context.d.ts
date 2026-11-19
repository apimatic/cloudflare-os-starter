import type { JsonValue, Schema } from "../core/validation/schema.js";
import { OrderApplicationContextLandingPage } from "./order-application-context-landing-page.js";
import { OrderApplicationContextShippingPreference } from "./order-application-context-shipping-preference.js";
import { OrderApplicationContextUserAction } from "./order-application-context-user-action.js";
import { type PaymentMethodPreference } from "./payment-method-preference.js";
import { type StoredPaymentSource } from "./stored-payment-source.js";
/**
 * Customizes the payer experience during the approval process for the payment with PayPal. Note:
 * Partners and Marketplaces might configure brand_name and shipping_preference during partner
 * account setup, which overrides the request values.
 */
export type OrderApplicationContext = {
    /**
     * DEPRECATED. The label that overrides the business name in the PayPal account on the PayPal
     * site. The fields in `application_context` are now available in the `experience_context` object
     * under the `payment_source` which supports them (eg.
     * `payment_source.paypal.experience_context.brand_name`). Please specify this field in the
     * `experience_context` object instead of the `application_context` object.
     *
     * @deprecated
     */
    brandName?: string;
    /**
     * DEPRECATED. The BCP 47-formatted locale of pages that the PayPal payment experience shows.
     * PayPal supports a five-character code. For example, `da-DK`, `he-IL`, `id-ID`, `ja-JP`,
     * `no-NO`, `pt-BR`, `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`. The fields in
     * `application_context` are now available in the `experience_context` object under the
     * `payment_source` which supports them (eg. `payment_source.paypal.experience_context.locale`).
     * Please specify this field in the `experience_context` object instead of the
     * `application_context` object.
     *
     * @deprecated
     */
    locale?: string;
    /**
     * DEPRECATED. DEPRECATED. The type of landing page to show on the PayPal site for customer
     * checkout. The fields in `application_context` are now available in the `experience_context`
     * object under the `payment_source` which supports them (eg.
     * `payment_source.paypal.experience_context.landing_page`). Please specify this field in the
     * `experience_context` object instead of the `application_context` object.
     *
     * @deprecated
     *
     * @default OrderApplicationContextLandingPage.NoPreference
     */
    landingPage?: OrderApplicationContextLandingPage;
    /**
     * DEPRECATED. DEPRECATED. The shipping preference: Displays the shipping address to the customer.
     * Enables the customer to choose an address on the PayPal site. Restricts the customer from
     * changing the address during the payment-approval process. . The fields in `application_context`
     * are now available in the `experience_context` object under the `payment_source` which supports
     * them (eg. `payment_source.paypal.experience_context.shipping_preference`). Please specify this
     * field in the `experience_context` object instead of the `application_context` object.
     *
     * @deprecated
     *
     * @default OrderApplicationContextShippingPreference.GetFromFile
     */
    shippingPreference?: OrderApplicationContextShippingPreference;
    /**
     * DEPRECATED. Configures a Continue or Pay Now checkout flow. The fields in `application_context`
     * are now available in the `experience_context` object under the `payment_source` which supports
     * them (eg. `payment_source.paypal.experience_context.user_action`). Please specify this field in
     * the `experience_context` object instead of the `application_context` object.
     *
     * @deprecated
     *
     * @default OrderApplicationContextUserAction.Continue
     */
    userAction?: OrderApplicationContextUserAction;
    /**
     * DEPRECATED. The customer and merchant payment preferences. The fields in `application_context`
     * are now available in the `experience_context` object under the `payment_source` which supports
     * them (eg. `payment_source.paypal.experience_context.payment_method_selected`). Please specify
     * this field in the `experience_context` object instead of the `application_context` object..
     *
     * @deprecated
     */
    paymentMethod?: PaymentMethodPreference;
    /**
     * DEPRECATED. The URL where the customer is redirected after the customer approves the payment.
     * The fields in `application_context` are now available in the `experience_context` object under
     * the `payment_source` which supports them (eg.
     * `payment_source.paypal.experience_context.return_url`). Please specify this field in the
     * `experience_context` object instead of the `application_context` object.
     *
     * @deprecated
     */
    returnUrl?: string;
    /**
     * DEPRECATED. The URL where the customer is redirected after the customer cancels the payment.
     * The fields in `application_context` are now available in the `experience_context` object under
     * the `payment_source` which supports them (eg.
     * `payment_source.paypal.experience_context.cancel_url`). Please specify this field in the
     * `experience_context` object instead of the `application_context` object.
     *
     * @deprecated
     */
    cancelUrl?: string;
    /**
     * DEPRECATED. Provides additional details to process a payment using a `payment_source` that has
     * been stored or is intended to be stored (also referred to as stored_credential or
     * card-on-file). Parameter compatibility: `payment_type=ONE_TIME` is compatible only with
     * `payment_initiator=CUSTOMER`. `usage=FIRST` is compatible only with
     * `payment_initiator=CUSTOMER`. `previous_transaction_reference` or
     * `previous_network_transaction_reference` is compatible only with `payment_initiator=MERCHANT`.
     * Only one of the parameters - `previous_transaction_reference` and
     * `previous_network_transaction_reference` - can be present in the request. . The fields in
     * `stored_payment_source` are now available in the `stored_credential` object under the
     * `payment_source` which supports them (eg.
     * `payment_source.card.stored_credential.payment_initiator`). Please specify this field in the
     * `payment_source` object instead of the `application_context` object.
     *
     * @deprecated
     */
    storedPaymentSource?: StoredPaymentSource;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const orderApplicationContextInternalSchema: Schema<OrderApplicationContext>;
export declare const orderApplicationContextSchema: Schema<OrderApplicationContext>;
