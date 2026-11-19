import * as s from "../core/validation/index.js";
import { venmoVaultResponseInternalSchema, venmoVaultResponseSchema, } from "./venmo-vault-response.js";
const venmoWalletAttributesResponseProperties = {
    vault: s.optional(s.lazy(() => venmoVaultResponseInternalSchema)),
};
export const venmoWalletAttributesResponseInternalSchema = s.object(venmoWalletAttributesResponseProperties, {
    additionalProperties: s.json(),
});
export const venmoWalletAttributesResponseSchema = s.lazySchema(() => s.object({
    ...venmoWalletAttributesResponseProperties,
    vault: s.optional(s.lazy(() => venmoVaultResponseSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=venmo-wallet-attributes-response.js.map