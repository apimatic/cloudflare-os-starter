import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The tax details. */
export type TaxesOverride = {
    /**
     * The percentage, as a fixed-point, signed decimal number. For example, define a 19.99% interest
     * rate as `19.99`.
     */
    percentage?: string;
    /** Indicates whether the tax was already included in the billing amount. */
    inclusive?: boolean;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const taxesOverrideInternalSchema: Schema<TaxesOverride>;
export declare const taxesOverrideSchema: Schema<TaxesOverride>;
