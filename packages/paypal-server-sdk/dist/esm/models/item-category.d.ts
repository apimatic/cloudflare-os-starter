import type { EnumSchema } from "../core/validation/schema.js";
/** The item category type. */
export declare const ItemCategory: {
    /**
     * Goods that are stored, delivered, and used in their electronic format. This value is not
     * currently supported for API callers that leverage the PayPal for Commerce Platform product.
     */
    readonly DigitalGoods: "DIGITAL_GOODS";
    /** A tangible item that can be shipped with proof of delivery. */
    readonly PhysicalGoods: "PHYSICAL_GOODS";
    /**
     * A contribution or gift for which no good or service is exchanged, usually to a not for profit
     * organization.
     */
    readonly Donation: "DONATION";
};
export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory] | (string & {});
export declare const itemCategorySchema: EnumSchema<ItemCategory>;
