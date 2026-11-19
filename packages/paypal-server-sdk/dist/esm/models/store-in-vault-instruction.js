import * as s from "../core/validation/index.js";
/** Defines how and when the payment source gets vaulted. */
export const StoreInVaultInstruction = {
    /**
     * Defines that the payment_source will be vaulted only when at least one authorization or capture
     * using that payment_source is successful.
     */
    OnSuccess: "ON_SUCCESS",
};
export const storeInVaultInstructionSchema = s.enumOf(StoreInVaultInstruction);
//# sourceMappingURL=store-in-vault-instruction.js.map