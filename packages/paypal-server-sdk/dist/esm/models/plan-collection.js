import * as s from "../core/validation/index.js";
import { billingPlanInternalSchema, billingPlanSchema } from "./billing-plan.js";
import { linkDescriptionSchema } from "./link-description.js";
const planCollectionProperties = {
    plans: s.optional(s.array(s.lazy(() => billingPlanInternalSchema))),
    totalItems: s.optional(s.int()),
    totalPages: s.optional(s.int()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        totalItems: "total_items",
        totalPages: "total_pages",
    },
};
export const planCollectionInternalSchema = s.object(planCollectionProperties, { additionalProperties: s.json() });
export const planCollectionSchema = s.lazySchema(() => s.object({
    ...planCollectionProperties,
    plans: s.optional(s.array(s.lazy(() => billingPlanSchema)).check(s.minLength(0), s.maxLength(32767))),
    totalItems: s.optional(s.int().check(s.gte(0), s.lte(500000000))),
    totalPages: s.optional(s.int().check(s.gte(0), s.lte(100000000))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=plan-collection.js.map