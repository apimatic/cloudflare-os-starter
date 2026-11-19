import type { EnumSchema } from "../core/validation/schema.js";
/** The vault status. */
export declare const VenmoVaultResponseStatus: {
    /**
     * The payment source has been saved in your customer's vault. This vault status reflects
     * `/v3/vault` status.
     */
    readonly Vaulted: "VAULTED";
    /**
     * DEPRECATED. The payment source has been saved in your customer's vault. This status applies to
     * deprecated integration patterns and will not be returned for v3/vault integrations.
     */
    readonly Created: "CREATED";
    /**
     * Customer has approved the action of saving the specified payment_source into their vault. Use
     * v3/vault/payment-tokens with given setup_token to save the payment source in the vault
     */
    readonly Approved: "APPROVED";
};
export type VenmoVaultResponseStatus = (typeof VenmoVaultResponseStatus)[keyof typeof VenmoVaultResponseStatus] | (string & {});
export declare const venmoVaultResponseStatusSchema: EnumSchema<VenmoVaultResponseStatus>;
