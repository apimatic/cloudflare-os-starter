import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { subscriptionInternalSchema, subscriptionSchema } from "./subscription.js";
const subscriptionCollectionProperties = {
    subscriptions: s.optional(s.array(s.lazy(() => subscriptionInternalSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
};
export const subscriptionCollectionInternalSchema = s.object(subscriptionCollectionProperties, { additionalProperties: s.json() });
export const subscriptionCollectionSchema = s.lazySchema(() => s.object({
    ...subscriptionCollectionProperties,
    subscriptions: s.optional(s.array(s.lazy(() => subscriptionSchema)).check(s.minLength(0), s.maxLength(32767))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-collection.js.map