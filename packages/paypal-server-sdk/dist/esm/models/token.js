import * as s from "../core/validation/index.js";
import { tokenTypeSchema } from "./token-type.js";
const tokenProperties = {
    id: s.string(),
    type: tokenTypeSchema,
};
export const tokenInternalSchema = s.object(tokenProperties, {
    additionalProperties: s.json(),
});
export const tokenSchema = s.lazySchema(() => s.object({
    ...tokenProperties,
    id: s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9a-zA-Z_-]+$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=token.js.map