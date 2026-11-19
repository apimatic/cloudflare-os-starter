import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BlikExperienceContext } from "./blik-experience-context.js";
import { type BlikLevel0PaymentObject } from "./blik-level0-payment-object.js";
import { type BlikOneClickPaymentRequest } from "./blik-one-click-payment-request.js";
/** Information needed to pay using BLIK. */
export type BlikPaymentRequest = {
    /** The full name representation like Mr J Smith. */
    name: string;
    /**
     * The [two-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
     * country or region. Note: The country code for Great Britain is GB and not UK as used in the
     * top-level domain names for that country. Use the `C2` country code for China worldwide for
     * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
     */
    countryCode: string;
    /**
     * The internationalized email address. Note: Up to 64 characters are allowed before and 255
     * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
     * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
     */
    email?: string;
    /** Customizes the payer experience during the approval process for the BLIK payment. */
    experienceContext?: BlikExperienceContext;
    /** Information used to pay using BLIK level_0 flow. */
    level0?: BlikLevel0PaymentObject;
    /** Information used to pay using BLIK one-click flow. */
    oneClick?: BlikOneClickPaymentRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const blikPaymentRequestInternalSchema: Schema<BlikPaymentRequest>;
export declare const blikPaymentRequestSchema: Schema<BlikPaymentRequest>;
