import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ItemDetails } from "./item-details.js";
/** The cart information. */
export type CartInformation = {
    /** An array of item details. */
    itemDetails?: ItemDetails[];
    /**
     * Indicates whether the item amount or the shipping amount already includes tax.
     *
     * @default false
     */
    taxInclusive?: boolean;
    /** The ID of the invoice. Appears for only PayPal-generated invoices. */
    paypalInvoiceId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cartInformationInternalSchema: Schema<CartInformation>;
export declare const cartInformationSchema: Schema<CartInformation>;
