import * as s from "../core/validation/index.js";
const nameProperties = {
    givenName: s.optional(s.string()),
    surname: s.optional(s.string()),
    _keysMap: {
        givenName: "given_name",
    },
};
export const nameInternalSchema = s.object(nameProperties, {
    additionalProperties: s.json(),
});
export const nameSchema = s.lazySchema(() => s.object({
    ...nameProperties,
    givenName: s.optional(s.string().check(s.maxLength(140))),
    surname: s.optional(s.string().check(s.maxLength(140))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=name.js.map