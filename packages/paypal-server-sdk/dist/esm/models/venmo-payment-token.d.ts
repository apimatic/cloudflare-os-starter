import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Address3 } from "./address3.js";
import { type CustomerType } from "./customer-type.js";
import { type Name } from "./name.js";
import { type PhoneWithType } from "./phone-with-type.js";
import { type UsagePatternPaymentMethodTokens } from "./usage-pattern-payment-method-tokens.js";
import { type UsageType } from "./usage-type.js";
import { type VaultedDigitalWalletShippingDetails } from "./vaulted-digital-wallet-shipping-details.js";
/** Full representation of a Venmo Payment Token. */
export type VenmoPaymentToken = {
    /**
     * The description displayed to the consumer on the approval flow for a digital wallet, as well as
     * on the merchant view of the payment token management experience. exp: PayPal.com.
     */
    description?: string;
    /** Expected business/charge model for the billing agreement. */
    usagePattern?: UsagePatternPaymentMethodTokens;
    /** The shipping details. */
    shipping?: VaultedDigitalWalletShippingDetails;
    /**
     * Create multiple payment tokens for the same payer, merchant/platform combination. Use this when
     * the customer has not logged in at merchant/platform. The payment token thus generated, can then
     * also be used to create the customer account at merchant/platform. Use this also when multiple
     * payment tokens are required for the same payer, different customer at merchant/platform. This
     * helps to identify customers distinctly even though they may share the same PayPal account. This
     * only applies to PayPal payment source.
     *
     * @default false
     */
    permitMultiplePaymentTokens?: boolean;
    /** The usage type associated with a digital wallet payment token. */
    usageType?: UsageType;
    /**
     * The customer type associated with a digital wallet payment token. This is to indicate whether
     * the customer acting on the merchant / platform is either a business or a consumer.
     */
    customerType?: CustomerType;
    /**
     * The internationalized email address.<blockquote><strong>Note:</strong> Up to 64 characters are
     * allowed before and 255 characters are allowed after the <code>@</code> sign. However, the
     * generally accepted maximum length for an email address is 254 characters. The pattern verifies
     * that an unquoted <code>@</code> sign exists.</blockquote>
     */
    emailAddress?: string;
    /** The account identifier for a PayPal account. */
    payerId?: string;
    /** The name of the party. */
    name?: Name;
    /** The phone information. */
    phone?: PhoneWithType;
    /**
     * The portable international postal address. Maps to
     * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
     * and HTML 5.1 [Autofilling form controls: the autocomplete
     * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
     */
    address?: Address3;
    /** The Venmo username, as chosen by the user. */
    userName?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoPaymentTokenInternalSchema: Schema<VenmoPaymentToken>;
export declare const venmoPaymentTokenSchema: Schema<VenmoPaymentToken>;
