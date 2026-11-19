import * as s from "../core/validation/index.js";
import { errorDetailsInternalSchema, errorDetailsSchema } from "./error-details.js";
import { linkDescriptionSchema } from "./link-description.js";
const errorErrorProperties = {
    name: s.string(),
    message: s.string(),
    debugId: s.string(),
    details: s.optional(s.array(s.lazy(() => errorDetailsInternalSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        debugId: "debug_id",
    },
};
export const errorErrorInternalSchema = s.object(errorErrorProperties, {
    additionalProperties: s.json(),
});
export const errorErrorSchema = s.lazySchema(() => s.object({
    ...errorErrorProperties,
    details: s.optional(s.array(s.lazy(() => errorDetailsSchema))),
}, { additionalProperties: s.json() }));
