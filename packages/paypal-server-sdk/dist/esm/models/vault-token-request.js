import * as s from "../core/validation/index.js";
import { vaultTokenRequestTypeSchema } from "./vault-token-request-type.js";
const vaultTokenRequestProperties = {
    id: s.string(),
    type: vaultTokenRequestTypeSchema,
};
export const vaultTokenRequestInternalSchema = s.object(vaultTokenRequestProperties, { additionalProperties: s.json() });
export const vaultTokenRequestSchema = s.lazySchema(() => s.object({
    ...vaultTokenRequestProperties,
    id: s.string().check(s.minLength(1), s.maxLength(255), s.pattern("^[0-9A-Za-z_-]+$")),
}, { additionalProperties: s.json() }));
