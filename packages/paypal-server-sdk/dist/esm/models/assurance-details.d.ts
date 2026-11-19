import type { JsonValue, Schema } from "../core/validation/schema.js";
/**
 * Information about cardholder possession validation and cardholder identification and
 * verifications (ID&V).
 */
export type AssuranceDetails = {
    /**
     * If true, indicates that Cardholder possession validation has been performed on returned payment
     * credential.
     *
     * @default false
     */
    accountVerified?: boolean;
    /**
     * If true, indicates that identification and verifications (ID&V) was performed on the returned
     * payment credential.If false, the same risk-based authentication can be performed as you would
     * for card transactions. This risk-based authentication can include, but not limited to, step-up
     * with 3D Secure protocol if applicable.
     *
     * @default false
     */
    cardHolderAuthenticated?: boolean;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const assuranceDetailsSchema: Schema<AssuranceDetails>;
