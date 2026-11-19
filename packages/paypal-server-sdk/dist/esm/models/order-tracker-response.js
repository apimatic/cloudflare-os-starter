import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { orderTrackerItemInternalSchema, orderTrackerItemSchema, } from "./order-tracker-item.js";
import { orderTrackerStatusSchema } from "./order-tracker-status.js";
const orderTrackerResponseProperties = {
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => orderTrackerStatusSchema)),
    items: s.optional(s.array(s.lazy(() => orderTrackerItemInternalSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    _keysMap: {
        createTime: "create_time",
        updateTime: "update_time",
    },
};
export const orderTrackerResponseInternalSchema = s.object(orderTrackerResponseProperties, { additionalProperties: s.json() });
export const orderTrackerResponseSchema = s.lazySchema(() => s.object({
    ...orderTrackerResponseProperties,
    items: s.optional(s.array(s.lazy(() => orderTrackerItemSchema))),
    createTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
    updateTime: s.optional(s
        .string()
        .check(s.minLength(20), s.maxLength(64), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=order-tracker-response.js.map