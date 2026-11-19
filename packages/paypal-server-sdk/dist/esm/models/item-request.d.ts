import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ItemCategory } from "./item-category.js";
import { type Money } from "./money.js";
import { type OrderBillingPlan } from "./order-billing-plan.js";
import { type UniversalProductCode } from "./universal-product-code.js";
/** The details for the items to be purchased. */
export type ItemRequest = {
    /** The item name or title. */
    name: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    unitAmount: Money;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    tax?: Money;
    /** The item quantity. Must be a whole number. */
    quantity: string;
    /**
     * This field supports up to 4000 characters, but any content beyond 2048 characters (including
     * spaces) will be truncated. The 2048 character limit is reflected in the response representation
     * of this field.
     */
    description?: string;
    /** The stock keeping unit (SKU) for the item. */
    sku?: string;
    /** The URL to the item being purchased. Visible to buyer and used in buyer experiences. */
    url?: string;
    /** The item category type. */
    category?: ItemCategory;
    /**
     * The URL of the item's image. File type and size restrictions apply. An image that violates
     * these restrictions will not be honored.
     */
    imageUrl?: string;
    /** The Universal Product Code of the item. */
    upc?: UniversalProductCode;
    /**
     * Metadata for merchant-managed recurring billing plans. Valid only during the saved payment
     * method token or billing agreement creation.
     */
    billingPlan?: OrderBillingPlan;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const itemRequestInternalSchema: Schema<ItemRequest>;
export declare const itemRequestSchema: Schema<ItemRequest>;
