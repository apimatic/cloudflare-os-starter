import * as s from "../core/validation/index.js";
import { storeInVaultInstructionSchema } from "./store-in-vault-instruction.js";
export const vaultInstructionSchema = s.object({
    storeInVault: storeInVaultInstructionSchema,
    _keysMap: {
        storeInVault: "store_in_vault",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=vault-instruction.js.map