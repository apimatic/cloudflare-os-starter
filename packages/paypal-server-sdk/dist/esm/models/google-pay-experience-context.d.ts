import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Customizes the payer experience during the approval process for the payment. */
export type GooglePayExperienceContext = {
    /** Describes the URL. */
    returnUrl: string;
    /** Describes the URL. */
    cancelUrl: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const googlePayExperienceContextInternalSchema: Schema<GooglePayExperienceContext>;
export declare const googlePayExperienceContextSchema: Schema<GooglePayExperienceContext>;
