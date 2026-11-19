import * as s from "../core/validation/index.js";
import { vaultInstructionActionSchema } from "./vault-instruction-action.js";
import { VaultUserAction, vaultUserActionSchema } from "./vault-user-action.js";
const vaultCardExperienceContextProperties = {
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
    userAction: s.defaulted(vaultUserActionSchema, VaultUserAction.Continue),
    _keysMap: {
        brandName: "brand_name",
        returnUrl: "return_url",
        cancelUrl: "cancel_url",
        vaultInstruction: "vault_instruction",
        userAction: "user_action",
    },
};
export const vaultCardExperienceContextInternalSchema = s.object(vaultCardExperienceContextProperties, {
    additionalProperties: s.json(),
});
export const vaultCardExperienceContextSchema = s.lazySchema(() => s.object({
    ...vaultCardExperienceContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
    locale: s.optional(s
        .string()
        .check(s.minLength(2), s.maxLength(10), s.pattern("^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|[0-9]{3}))?$"))),
    returnUrl: s.optional(s.string().check(s.minLength(1), s.maxLength(4000), s.url())),
    cancelUrl: s.optional(s.string().check(s.minLength(1), s.maxLength(4000), s.url())),
}, { additionalProperties: s.json() }));
