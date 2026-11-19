import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type VaultInstructionAction } from "./vault-instruction-action.js";
import { VaultUserAction } from "./vault-user-action.js";
import { VenmoExperienceContextShippingPreference } from "./venmo-experience-context-shipping-preference.js";
/** A resource representing an experience context of vault a venmo account. */
export type VenmoExperienceContext = {
    /**
     * The label that overrides the business name in the PayPal account on the PayPal site. The
     * pattern is defined by an external party and supports Unicode.
     */
    brandName?: string;
    /**
     * The shipping preference. This only applies to PayPal payment source.
     *
     * @default VenmoExperienceContextShippingPreference.GetFromFile
     */
    shippingPreference?: VenmoExperienceContextShippingPreference;
    /**
     * DEPRECATED. Vault Instruction on action to be performed after a successful payer approval.
     *
     * @deprecated
     */
    vaultInstruction?: VaultInstructionAction;
    /**
     * User Action on action to be performed after a successful payer approval.
     *
     * @default VaultUserAction.Continue
     */
    userAction?: VaultUserAction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const venmoExperienceContextInternalSchema: Schema<VenmoExperienceContext>;
export declare const venmoExperienceContextSchema: Schema<VenmoExperienceContext>;
