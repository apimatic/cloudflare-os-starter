import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type PayeeBase } from "./payee-base.js";
/** Details about the merchant cobranded card used for order purchase. */
export type CobrandedCard = {
    /** Array of labels for the cobranded card. */
    labels?: string[];
    /**
     * The details for the merchant who receives the funds and fulfills the order. The merchant is
     * also known as the payee.
     */
    payee?: PayeeBase;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount?: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cobrandedCardInternalSchema: Schema<CobrandedCard>;
export declare const cobrandedCardSchema: Schema<CobrandedCard>;
