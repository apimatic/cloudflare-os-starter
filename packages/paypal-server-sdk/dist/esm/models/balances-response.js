import * as s from "../core/validation/index.js";
import { balanceInformationInternalSchema, balanceInformationSchema, } from "./balance-information.js";
const balancesResponseProperties = {
    balances: s.optional(s.array(s.lazy(() => balanceInformationInternalSchema))),
    accountId: s.optional(s.string()),
    asOfTime: s.optional(s.string()),
    lastRefreshTime: s.optional(s.string()),
    _keysMap: {
        accountId: "account_id",
        asOfTime: "as_of_time",
        lastRefreshTime: "last_refresh_time",
    },
};
export const balancesResponseInternalSchema = s.object(balancesResponseProperties, { additionalProperties: s.json() });
export const balancesResponseSchema = s.lazySchema(() => s.object({
    ...balancesResponseProperties,
    balances: s.optional(s.array(s.lazy(() => balanceInformationSchema)).check(s.minLength(0), s.maxLength(200))),
    accountId: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("^[2-9A-HJ-NP-Z]{13}$"))),
    asOfTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    lastRefreshTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
