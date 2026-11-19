import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
/**
 * Basic vault instruction specification that can be extended by specific payment sources that
 * supports vaulting.
 */
export type VaultInstructionBase = {
    /** Defines how and when the payment source gets vaulted. */
    storeInVault?: StoreInVaultInstruction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultInstructionBaseSchema: Schema<VaultInstructionBase>;
