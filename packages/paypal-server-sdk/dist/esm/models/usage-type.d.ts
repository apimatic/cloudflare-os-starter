import type { EnumSchema } from "../core/validation/schema.js";
/** The usage type associated with a digital wallet payment token. */
export declare const UsageType: {
    /** The PayPal Payment Token will be used for future transaction directly with a merchant. */
    readonly Merchant: "MERCHANT";
    /**
     * The PayPal Payment Token will be used for future transaction on a platform. A platform is
     * typically a marketplace or a channel that a payer can purchase goods and services from multiple
     * merchants.
     */
    readonly Platform: "PLATFORM";
};
export type UsageType = (typeof UsageType)[keyof typeof UsageType] | (string & {});
export declare const usageTypeSchema: EnumSchema<UsageType>;
