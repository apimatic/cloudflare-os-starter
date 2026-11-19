import * as s from "../core/validation/index.js";
import { vaultResponseInternalSchema, vaultResponseSchema } from "./vault-response.js";
const applePayAttributesResponseProperties = {
    vault: s.optional(s.lazy(() => vaultResponseInternalSchema)),
};
export const applePayAttributesResponseInternalSchema = s.object(applePayAttributesResponseProperties, {
    additionalProperties: s.json(),
});
export const applePayAttributesResponseSchema = s.lazySchema(() => s.object({
    ...applePayAttributesResponseProperties,
    vault: s.optional(s.lazy(() => vaultResponseSchema)),
}, { additionalProperties: s.json() }));
