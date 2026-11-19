import * as s from "../core/validation/index.js";
import { linkHttpMethodSchema } from "./link-http-method.js";
export const linkDescriptionSchema = s.object({
    href: s.string(),
    rel: s.string(),
    method: s.optional(s.lazy(() => linkHttpMethodSchema)),
}, { additionalProperties: s.json() });
//# sourceMappingURL=link-description.js.map