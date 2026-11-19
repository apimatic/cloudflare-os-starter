import type { EnumSchema } from "../core/validation/schema.js";
/** Defines how and when the payment source gets vaulted. */
export declare const StoreInVaultInstruction: {
    /**
     * Defines that the payment_source will be vaulted only when at least one authorization or capture
     * using that payment_source is successful.
     */
    readonly OnSuccess: "ON_SUCCESS";
};
export type StoreInVaultInstruction = (typeof StoreInVaultInstruction)[keyof typeof StoreInVaultInstruction] | (string & {});
export declare const storeInVaultInstructionSchema: EnumSchema<StoreInVaultInstruction>;
