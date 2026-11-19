import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
import { type PayeeBase } from "./payee-base.js";
/**
 * The platform or partner fee, commission, or brokerage fee that is associated with the
 * transaction. Not a separate or isolated transaction leg from the external perspective. The
 * platform fee is limited in scope and is always associated with the original payment for the
 * purchase unit.
 */
export type PlatformFee = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount: Money;
    /**
     * The details for the merchant who receives the funds and fulfills the order. The merchant is
     * also known as the payee.
     */
    payee?: PayeeBase;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const platformFeeInternalSchema: Schema<PlatformFee>;
export declare const platformFeeSchema: Schema<PlatformFee>;
