import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
/** The pricing tier details. */
export type PricingTier = {
    /** The starting quantity for the tier. */
    startingQuantity: string;
    /** The ending quantity for the tier. Optional for the last tier. */
    endingQuantity?: string;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const pricingTierInternalSchema: Schema<PricingTier>;
export declare const pricingTierSchema: Schema<PricingTier>;
