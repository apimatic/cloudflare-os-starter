import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type SepaDebitExperienceContext } from "./sepa-debit-experience-context.js";
/** An API resource denoting a request to securely store a SEPA Debit. */
export type SepaDebitRequest = {
    /** Customizes the payer experience during the approval process for the SEPA Debit payment. */
    experienceContext?: SepaDebitExperienceContext;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const sepaDebitRequestInternalSchema: Schema<SepaDebitRequest>;
export declare const sepaDebitRequestSchema: Schema<SepaDebitRequest>;
