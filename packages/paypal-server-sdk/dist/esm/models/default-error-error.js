import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { transactionSearchErrorDetailsSchema, } from "./transaction-search-error-details.js";
export const defaultErrorErrorSchema = s.object({
    name: s.string(),
    message: s.string(),
    debugId: s.string(),
    informationLink: s.optional(s.string()),
    details: s.optional(s.array(s.lazy(() => transactionSearchErrorDetailsSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
        debugId: "debug_id",
        informationLink: "information_link",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=default-error-error.js.map