import * as s from "../core/validation/index.js";
/** The tokenization method that generated the ID. */
export const VaultTokenRequestType = {
    /** The setup token, which is a temporary reference to payment source. */
    SetupToken: "SETUP_TOKEN",
};
export const vaultTokenRequestTypeSchema = s.enumOf(VaultTokenRequestType);
//# sourceMappingURL=vault-token-request-type.js.map