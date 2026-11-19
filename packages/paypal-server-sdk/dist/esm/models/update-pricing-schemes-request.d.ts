import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type UpdatePricingScheme } from "./update-pricing-scheme.js";
/** The update pricing scheme request details. */
export type UpdatePricingSchemesRequest = {
    /** An array of pricing schemes. */
    pricingSchemes: UpdatePricingScheme[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const updatePricingSchemesRequestInternalSchema: Schema<UpdatePricingSchemesRequest>;
export declare const updatePricingSchemesRequestSchema: Schema<UpdatePricingSchemesRequest>;
