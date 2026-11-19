import * as s from "../core/validation/index.js";
const relatedIdentifiersProperties = {
    orderId: s.optional(s.string()),
    authorizationId: s.optional(s.string()),
    captureId: s.optional(s.string()),
    _keysMap: {
        orderId: "order_id",
        authorizationId: "authorization_id",
        captureId: "capture_id",
    },
};
export const relatedIdentifiersInternalSchema = s.object(relatedIdentifiersProperties, { additionalProperties: s.json() });
export const relatedIdentifiersSchema = s.lazySchema(() => s.object({
    ...relatedIdentifiersProperties,
    orderId: s.optional(s.string().check(s.minLength(1), s.maxLength(20), s.pattern("^[A-Z0-9]+$"))),
    authorizationId: s.optional(s.string().check(s.minLength(1), s.maxLength(20), s.pattern("^[A-Z0-9]+$"))),
    captureId: s.optional(s.string().check(s.minLength(1), s.maxLength(20), s.pattern("^[A-Z0-9]+$"))),
}, { additionalProperties: s.json() }));
