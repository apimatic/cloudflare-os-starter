import * as s from "../core/validation/index.js";
const cancelSubscriptionRequestProperties = {
    reason: s.string(),
};
export const cancelSubscriptionRequestInternalSchema = s.object(cancelSubscriptionRequestProperties, {
    additionalProperties: s.json(),
});
export const cancelSubscriptionRequestSchema = s.lazySchema(() => s.object({
    ...cancelSubscriptionRequestProperties,
    reason: s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$")),
}, { additionalProperties: s.json() }));
