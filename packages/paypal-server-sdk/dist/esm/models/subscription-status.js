import * as s from "../core/validation/index.js";
import { statusSchema } from "./status.js";
const subscriptionStatusProperties = {
    status: s.optional(s.lazy(() => statusSchema)),
    statusChangeNote: s.optional(s.string()),
    statusUpdateTime: s.optional(s.string()),
    _keysMap: {
        statusChangeNote: "status_change_note",
        statusUpdateTime: "status_update_time",
    },
};
export const subscriptionStatusInternalSchema = s.object(subscriptionStatusProperties, { additionalProperties: s.json() });
export const subscriptionStatusSchema = s.lazySchema(() => s.object({
    ...subscriptionStatusProperties,
    statusChangeNote: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
    statusUpdateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
