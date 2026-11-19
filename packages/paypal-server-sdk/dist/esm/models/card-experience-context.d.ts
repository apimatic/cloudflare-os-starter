import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Customizes the payer experience during the 3DS Approval for payment. */
export type CardExperienceContext = {
    /** Describes the URL. */
    returnUrl?: string;
    /** Describes the URL. */
    cancelUrl?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardExperienceContextInternalSchema: Schema<CardExperienceContext>;
export declare const cardExperienceContextSchema: Schema<CardExperienceContext>;
