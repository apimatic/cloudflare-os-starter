import * as s from "../core/validation/index.js";
import { errorDetailsInternalSchema, errorDetailsSchema } from "./error-details.js";
import { linkDescriptionSchema } from "./link-description.js";
const subscriptionErrorProperties = {
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
export const subscriptionErrorInternalSchema = s.object(subscriptionErrorProperties, { additionalProperties: s.json() });
export const subscriptionErrorSchema = s.lazySchema(() => s.object({
    ...subscriptionErrorProperties,
    details: s.optional(s.array(s.lazy(() => errorDetailsSchema))),
}, { additionalProperties: s.json() }));
