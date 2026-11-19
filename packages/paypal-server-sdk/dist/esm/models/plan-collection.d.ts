import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BillingPlan } from "./billing-plan.js";
import { type LinkDescription } from "./link-description.js";
/** The list of plans with details. */
export type PlanCollection = {
    /** An array of plans. */
    plans?: BillingPlan[];
    /** The total number of items. */
    totalItems?: number;
    /** The total number of pages. */
    totalPages?: number;
    /**
     * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
     */
    links?: LinkDescription[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const planCollectionInternalSchema: Schema<PlanCollection>;
export declare const planCollectionSchema: Schema<PlanCollection>;
