import type { EnumSchema } from "../core/validation/schema.js";
/** The usage type associated with the Venmo payment token. */
export declare const VenmoPaymentTokenUsageType: {
    /** The Venmo Payment Token will be used for future transaction directly with a merchant. */
    readonly Merchant: "MERCHANT";
    /**
     * The Venmo Payment Token will be used for future transaction on a platform. A platform is
     * typically a marketplace or a channel that a payer can purchase goods and services from multiple
     * merchants.
     */
    readonly Platform: "PLATFORM";
};
export type VenmoPaymentTokenUsageType = (typeof VenmoPaymentTokenUsageType)[keyof typeof VenmoPaymentTokenUsageType] | (string & {});
export declare const venmoPaymentTokenUsageTypeSchema: EnumSchema<VenmoPaymentTokenUsageType>;
