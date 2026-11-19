import * as s from "../core/validation/index.js";
import { sepaDebitExperienceContextInternalSchema, sepaDebitExperienceContextSchema, } from "./sepa-debit-experience-context.js";
const sepaDebitRequestProperties = {
    experienceContext: s.optional(s.lazy(() => sepaDebitExperienceContextInternalSchema)),
    _keysMap: {
        experienceContext: "experience_context",
    },
};
export const sepaDebitRequestInternalSchema = s.object(sepaDebitRequestProperties, { additionalProperties: s.json() });
export const sepaDebitRequestSchema = s.lazySchema(() => s.object({
    ...sepaDebitRequestProperties,
    experienceContext: s.optional(s.lazy(() => sepaDebitExperienceContextSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=sepa-debit-request.js.map