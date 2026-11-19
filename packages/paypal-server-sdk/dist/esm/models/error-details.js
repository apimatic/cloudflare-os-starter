import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
const errorDetailsProperties = {
    field: s.optional(s.string()),
    value: s.optional(s.string()),
    location: s.defaulted(s.string(), "body"),
    issue: s.string(),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    description: s.optional(s.string()),
};
export const errorDetailsInternalSchema = s.object(errorDetailsProperties, { additionalProperties: s.json() });
export const errorDetailsSchema = s.lazySchema(() => s.object({
    ...errorDetailsProperties,
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(4))),
}, { additionalProperties: s.json() }));
