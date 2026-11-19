import type { EnumSchema } from "../core/validation/schema.js";
/** The tokenization method that generated the ID. */
export declare const VaultTokenRequestType: {
    /** The setup token, which is a temporary reference to payment source. */
    readonly SetupToken: "SETUP_TOKEN";
};
export type VaultTokenRequestType = (typeof VaultTokenRequestType)[keyof typeof VaultTokenRequestType] | (string & {});
export declare const vaultTokenRequestTypeSchema: EnumSchema<VaultTokenRequestType>;
