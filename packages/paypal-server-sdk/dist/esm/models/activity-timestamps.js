import * as s from "../core/validation/index.js";
const activityTimestampsProperties = {
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    _keysMap: {
        createTime: "create_time",
        updateTime: "update_time",
    },
};
export const activityTimestampsInternalSchema = s.object(activityTimestampsProperties, { additionalProperties: s.json() });
export const activityTimestampsSchema = s.lazySchema(() => s.object({
    ...activityTimestampsProperties,
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
