import type { EnumSchema } from "../core/validation/schema.js";
/** Vault Instruction on action to be performed after a successful payer approval. */
export declare const VaultInstructionAction: {
    /** Vault the payment method after API caller performs a successful POST on Payment Tokens. */
    readonly OnCreatePaymentTokens: "ON_CREATE_PAYMENT_TOKENS";
    /** Vault the payment method on successful payer authentication and approval. */
    readonly OnPayerApproval: "ON_PAYER_APPROVAL";
};
export type VaultInstructionAction = (typeof VaultInstructionAction)[keyof typeof VaultInstructionAction] | (string & {});
export declare const vaultInstructionActionSchema: EnumSchema<VaultInstructionAction>;
