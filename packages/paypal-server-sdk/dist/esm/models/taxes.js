import * as s from "../core/validation/index.js";
const taxesProperties = {
    percentage: s.string(),
    inclusive: s.defaulted(s.boolean(), true),
};
export const taxesInternalSchema = s.object(taxesProperties, {
    additionalProperties: s.json(),
});
export const taxesSchema = s.lazySchema(() => s.object({
    ...taxesProperties,
    percentage: s.string().check(s.pattern("^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$")),
}, { additionalProperties: s.json() }));
