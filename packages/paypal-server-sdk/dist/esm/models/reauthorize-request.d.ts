import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type Money } from "./money.js";
/**
 * Reauthorizes an authorized PayPal account payment, by ID. To ensure that funds are still
 * available, reauthorize a payment after its initial three-day honor period expires. You can
 * reauthorize a payment only once from days four to 29. If 30 days have transpired since the date
 * of the original authorization, you must create an authorized payment instead of reauthorizing the
 * original authorized payment. A reauthorized payment itself has a new honor period of three days.
 * You can reauthorize an authorized payment once. The allowed amount depends on context and
 * geography, for example in US it is up to 115% of the original authorized amount, not to exceed an
 * increase of $75 USD. Supports only the `amount` request parameter.
 */
export type ReauthorizeRequest = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount?: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const reauthorizeRequestInternalSchema: Schema<ReauthorizeRequest>;
export declare const reauthorizeRequestSchema: Schema<ReauthorizeRequest>;
