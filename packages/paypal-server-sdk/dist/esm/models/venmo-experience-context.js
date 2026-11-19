import * as s from "../core/validation/index.js";
import { vaultInstructionActionSchema } from "./vault-instruction-action.js";
import { VaultUserAction, vaultUserActionSchema } from "./vault-user-action.js";
import { VenmoExperienceContextShippingPreference, venmoExperienceContextShippingPreferenceSchema, } from "./venmo-experience-context-shipping-preference.js";
const venmoExperienceContextProperties = {
    brandName: s.optional(s.string()),
    shippingPreference: s.defaulted(venmoExperienceContextShippingPreferenceSchema, VenmoExperienceContextShippingPreference.GetFromFile),
    vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
    userAction: s.defaulted(vaultUserActionSchema, VaultUserAction.Continue),
    _keysMap: {
        brandName: "brand_name",
        shippingPreference: "shipping_preference",
        vaultInstruction: "vault_instruction",
        userAction: "user_action",
    },
};
export const venmoExperienceContextInternalSchema = s.object(venmoExperienceContextProperties, { additionalProperties: s.json() });
export const venmoExperienceContextSchema = s.lazySchema(() => s.object({
    ...venmoExperienceContextProperties,
    brandName: s.optional(s.string().check(s.minLength(1), s.maxLength(127), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
