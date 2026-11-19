import * as s from "../core/validation/index.js";
const activateSubscriptionRequestProperties = {
    reason: s.optional(s.string()),
};
export const activateSubscriptionRequestInternalSchema = s.object(activateSubscriptionRequestProperties, {
    additionalProperties: s.json(),
});
export const activateSubscriptionRequestSchema = s.lazySchema(() => s.object({
    ...activateSubscriptionRequestProperties,
    reason: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
