import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AppSwitchContext } from "./app-switch-context.js";
import { VaultExperienceContextShippingPreference } from "./vault-experience-context-shipping-preference.js";
import { type VaultInstructionAction } from "./vault-instruction-action.js";
import { VaultUserAction } from "./vault-user-action.js";
/** Customizes the Vault creation flow experience for your customers. */
export type VaultExperienceContext = {
    /**
     * The label that overrides the business name in the PayPal account on the PayPal site. The
     * pattern is defined by an external party and supports Unicode.
     */
    brandName?: string;
    /**
     * The [language tag](https://tools.ietf.org/html/bcp47#section-2) for the language in which to
     * localize the error-related strings, such as messages, issues, and suggested actions. The tag is
     * made up of the [ISO 639-2 language
     * code](https://www.loc.gov/standards/iso639-2/php/code_list.php), the optional [ISO-15924 script
     * tag](https://www.unicode.org/iso15924/codelists.html), and the [ISO-3166 alpha-2 country
     * code](/api/rest/reference/country-codes/) or [M49 region
     * code](https://unstats.un.org/unsd/methodology/m49/).
     */
    locale?: string;
    /**
     * The URL where the customer is redirected after customer approves leaves the flow. It is a
     * required field for contingency flows like PayPal wallet, 3DS.
     */
    returnUrl?: string;
    /**
     * The URL where the customer is redirected after customer cancels or leaves the flow. It is a
     * required field for contingency flows like PayPal wallet, 3DS.
     */
    cancelUrl?: string;
    /**
     * The shipping preference. This only applies to PayPal payment source.
     *
     * @default VaultExperienceContextShippingPreference.GetFromFile
     */
    shippingPreference?: VaultExperienceContextShippingPreference;
    /**
     * DEPRECATED. Vault Instruction on action to be performed after a successful payer approval.
     *
     * @deprecated
     */
    vaultInstruction?: VaultInstructionAction;
    /**
     * Merchant provided details of the native app or mobile web browser to facilitate buyer's app
     * switch to the PayPal consumer app.
     */
    appSwitchContext?: AppSwitchContext;
    /**
     * User Action on action to be performed after a successful payer approval.
     *
     * @default VaultUserAction.Continue
     */
    userAction?: VaultUserAction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultExperienceContextInternalSchema: Schema<VaultExperienceContext>;
export declare const vaultExperienceContextSchema: Schema<VaultExperienceContext>;
