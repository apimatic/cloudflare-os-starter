import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type PricingModel } from "./pricing-model.js";
/** The pricing scheme details. */
export type PricingScheme = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    price?: Money;
    /** The pricing model for the billing cycle. */
    pricingModel: PricingModel;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    reloadThresholdAmount?: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const pricingSchemeInternalSchema: Schema<PricingScheme>;
export declare const pricingSchemeSchema: Schema<PricingScheme>;
