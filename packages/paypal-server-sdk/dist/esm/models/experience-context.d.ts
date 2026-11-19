import type { JsonValue, Schema } from "../core/validation/schema.js";
import { ExperienceContextShippingPreference } from "./experience-context-shipping-preference.js";
/** Customizes the payer experience during the approval process for the payment. */
export type ExperienceContext = {
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
     * The location from which the shipping address is derived.
     *
     * @default ExperienceContextShippingPreference.GetFromFile
     */
    shippingPreference?: ExperienceContextShippingPreference;
    /** Describes the URL. */
    returnUrl?: string;
    /** Describes the URL. */
    cancelUrl?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const experienceContextInternalSchema: Schema<ExperienceContext>;
export declare const experienceContextSchema: Schema<ExperienceContext>;
