import * as s from "../core/validation/index.js";
import { nameInternalSchema, nameSchema } from "./name.js";
const vaultCustomerProperties = {
    id: s.optional(s.string()),
    name: s.optional(s.lazy(() => nameInternalSchema)),
};
export const vaultCustomerInternalSchema = s.object(vaultCustomerProperties, { additionalProperties: s.json() });
export const vaultCustomerSchema = s.lazySchema(() => s.object({
    ...vaultCustomerProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(22), s.pattern("^[0-9a-zA-Z_-]+$"))),
    name: s.optional(s.lazy(() => nameSchema)),
}, { additionalProperties: s.json() }));
