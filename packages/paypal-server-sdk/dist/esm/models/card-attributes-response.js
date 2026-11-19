import * as s from "../core/validation/index.js";
import { cardVaultResponseInternalSchema, cardVaultResponseSchema, } from "./card-vault-response.js";
const cardAttributesResponseProperties = {
    vault: s.optional(s.lazy(() => cardVaultResponseInternalSchema)),
};
export const cardAttributesResponseInternalSchema = s.object(cardAttributesResponseProperties, { additionalProperties: s.json() });
export const cardAttributesResponseSchema = s.lazySchema(() => s.object({
    ...cardAttributesResponseProperties,
    vault: s.optional(s.lazy(() => cardVaultResponseSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-attributes-response.js.map