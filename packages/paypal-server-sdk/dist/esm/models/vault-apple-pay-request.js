import * as s from "../core/validation/index.js";
import { applePayRequestCardInternalSchema, applePayRequestCardSchema, } from "./apple-pay-request-card.js";
const vaultApplePayRequestProperties = {
    token: s.optional(s.string()),
    card: s.optional(s.lazy(() => applePayRequestCardInternalSchema)),
};
export const vaultApplePayRequestInternalSchema = s.object(vaultApplePayRequestProperties, { additionalProperties: s.json() });
export const vaultApplePayRequestSchema = s.lazySchema(() => s.object({
    ...vaultApplePayRequestProperties,
    token: s.optional(s.string().check(s.minLength(1), s.maxLength(10000), s.pattern("^.*$"))),
    card: s.optional(s.lazy(() => applePayRequestCardSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=vault-apple-pay-request.js.map