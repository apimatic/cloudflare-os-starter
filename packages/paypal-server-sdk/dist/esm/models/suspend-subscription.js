import * as s from "../core/validation/index.js";
const suspendSubscriptionProperties = {
    reason: s.string(),
};
export const suspendSubscriptionInternalSchema = s.object(suspendSubscriptionProperties, { additionalProperties: s.json() });
export const suspendSubscriptionSchema = s.lazySchema(() => s.object({
    ...suspendSubscriptionProperties,
    reason: s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=suspend-subscription.js.map