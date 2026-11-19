import * as s from "../core/validation/index.js";
import { storeInVaultInstructionSchema } from "./store-in-vault-instruction.js";
export const vaultInstructionBaseSchema = s.object({
    storeInVault: s.optional(s.lazy(() => storeInVaultInstructionSchema)),
    _keysMap: {
        storeInVault: "store_in_vault",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=vault-instruction-base.js.map