import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
/**
 * Base vaulting specification. The object can be extended for specific use cases within each
 * payment_source that supports vaulting.
 */
export type VaultInstruction = {
    /** Defines how and when the payment source gets vaulted. */
    storeInVault: StoreInVaultInstruction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const vaultInstructionSchema: Schema<VaultInstruction>;
