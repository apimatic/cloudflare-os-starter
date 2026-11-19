import * as s from "../core/validation/index.js";
import { errorDetailsInternalSchema, errorDetailsSchema } from "./error-details.js";
import { linkDescriptionSchema } from "./link-description.js";
const subscriptionErrorErrorProperties = {
    name: s.string(),
    message: s.string(),
    debugId: s.string(),
    informationLink: s.optional(s.string()),
    details: s.optional(s.array(s.lazy(() => errorDetailsInternalSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        debugId: "debug_id",
        informationLink: "information_link",
    },
};
export const subscriptionErrorErrorInternalSchema = s.object(subscriptionErrorErrorProperties, { additionalProperties: s.json() });
export const subscriptionErrorErrorSchema = s.lazySchema(() => s.object({
    ...subscriptionErrorErrorProperties,
    details: s.optional(s.array(s.lazy(() => errorDetailsSchema))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-error-error.js.map