import * as s from "../core/validation/index.js";
const taxesOverrideProperties = {
    percentage: s.optional(s.string()),
    inclusive: s.optional(s.boolean()),
};
export const taxesOverrideInternalSchema = s.object(taxesOverrideProperties, { additionalProperties: s.json() });
export const taxesOverrideSchema = s.lazySchema(() => s.object({
    ...taxesOverrideProperties,
    percentage: s.optional(s.string().check(s.pattern("^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$"))),
}, { additionalProperties: s.json() }));
