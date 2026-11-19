import * as s from "../core/validation/index.js";
import { linkDescriptionSchema } from "./link-description.js";
import { vaultCustomerInternalSchema, vaultCustomerSchema } from "./vault-customer.js";
import { vaultStatusSchema } from "./vault-status.js";
const vaultResponseProperties = {
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => vaultStatusSchema)),
    customer: s.optional(s.lazy(() => vaultCustomerInternalSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
};
export const vaultResponseInternalSchema = s.object(vaultResponseProperties, { additionalProperties: s.json() });
export const vaultResponseSchema = s.lazySchema(() => s.object({
    ...vaultResponseProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(255))),
    customer: s.optional(s.lazy(() => vaultCustomerSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema)).check(s.minLength(1), s.maxLength(10))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=vault-response.js.map