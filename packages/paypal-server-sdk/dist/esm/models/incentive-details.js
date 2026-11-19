import * as s from "../core/validation/index.js";
import { moneyTransactionSearchInternalSchema, moneyTransactionSearchSchema, } from "./money-transaction-search.js";
const incentiveDetailsProperties = {
    incentiveType: s.optional(s.string()),
    incentiveCode: s.optional(s.string()),
    incentiveAmount: s.optional(s.lazy(() => moneyTransactionSearchInternalSchema)),
    incentiveProgramCode: s.optional(s.string()),
    _keysMap: {
        incentiveType: "incentive_type",
        incentiveCode: "incentive_code",
        incentiveAmount: "incentive_amount",
        incentiveProgramCode: "incentive_program_code",
    },
};
export const incentiveDetailsInternalSchema = s.object(incentiveDetailsProperties, { additionalProperties: s.json() });
export const incentiveDetailsSchema = s.lazySchema(() => s.object({
    ...incentiveDetailsProperties,
    incentiveType: s.optional(s.string().check(s.minLength(1), s.maxLength(500), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    incentiveCode: s.optional(s.string().check(s.minLength(1), s.maxLength(200), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
    incentiveAmount: s.optional(s.lazy(() => moneyTransactionSearchSchema)),
    incentiveProgramCode: s.optional(s.string().check(s.minLength(1), s.maxLength(100), s.pattern("^[a-zA-Z0-9_'\\-., \":;\\!?]*$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=incentive-details.js.map