import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { transactionDetailsInternalSchema, transactionDetailsSchema, } from "./transaction-details.js";
const searchResponseProperties = {
    transactionDetails: s.optional(s.array(s.lazy(() => transactionDetailsInternalSchema))),
    accountNumber: s.optional(s.string()),
    startDate: s.optional(s.string()),
    endDate: s.optional(s.string()),
    lastRefreshedDatetime: s.optional(s.string()),
    page: s.optional(s.int()),
    totalItems: s.optional(s.int()),
    totalPages: s.optional(s.int()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        transactionDetails: "transaction_details",
        accountNumber: "account_number",
        startDate: "start_date",
        endDate: "end_date",
        lastRefreshedDatetime: "last_refreshed_datetime",
        totalItems: "total_items",
        totalPages: "total_pages",
    },
};
export const searchResponseInternalSchema = s.object(searchResponseProperties, { additionalProperties: s.json() });
export const searchResponseSchema = s.lazySchema(() => s.object({
    ...searchResponseProperties,
    transactionDetails: s.optional(s.array(s.lazy(() => transactionDetailsSchema)).check(s.minLength(1), s.maxLength(2147483647))),
    accountNumber: s.optional(s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[a-zA-Z0-9]*$"))),
    startDate: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    endDate: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    lastRefreshedDatetime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    page: s.optional(s.int().check(s.gte(0), s.lte(2147483647))),
    totalItems: s.optional(s.int().check(s.gte(0), s.lte(2147483647))),
    totalPages: s.optional(s.int().check(s.gte(0), s.lte(2147483647))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(32767))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=search-response.js.map