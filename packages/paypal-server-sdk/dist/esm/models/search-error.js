import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { transactionSearchErrorDetailsSchema, } from "./transaction-search-error-details.js";
const searchErrorProperties = {
    name: s.string(),
    message: s.string(),
    debugId: s.string(),
    informationLink: s.optional(s.string()),
    details: s.optional(s.array(s.lazy(() => transactionSearchErrorDetailsSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    totalItems: s.optional(s.int()),
    maximumItems: s.optional(s.int()),
    _keysMap: {
        debugId: "debug_id",
        informationLink: "information_link",
        totalItems: "total_items",
        maximumItems: "maximum_items",
    },
};
export const searchErrorInternalSchema = s.object(searchErrorProperties, {
    additionalProperties: s.json(),
});
export const searchErrorSchema = s.lazySchema(() => s.object({
    ...searchErrorProperties,
    totalItems: s.optional(s.int().check(s.gte(0), s.lte(2147483647))),
    maximumItems: s.optional(s.int().check(s.gte(0), s.lte(2147483647))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=search-error.js.map