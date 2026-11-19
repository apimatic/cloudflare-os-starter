import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { subscriptionTransactionDetailsInternalSchema, subscriptionTransactionDetailsSchema, } from "./subscription-transaction-details.js";
const transactionsListProperties = {
    transactions: s.optional(s.array(s.lazy(() => subscriptionTransactionDetailsInternalSchema))),
    totalItems: s.optional(s.int()),
    totalPages: s.optional(s.int()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        totalItems: "total_items",
        totalPages: "total_pages",
    },
};
export const transactionsListInternalSchema = s.object(transactionsListProperties, { additionalProperties: s.json() });
export const transactionsListSchema = s.lazySchema(() => s.object({
    ...transactionsListProperties,
    transactions: s.optional(s.array(s.lazy(() => subscriptionTransactionDetailsSchema)).check(s.minLength(0), s.maxLength(32767))),
    totalItems: s.optional(s.int().check(s.gte(0), s.lte(500000000))),
    totalPages: s.optional(s.int().check(s.gte(0), s.lte(100000000))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
