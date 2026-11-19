import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AuthorizationWithAdditionalData } from "./authorization-with-additional-data.js";
import { type OrdersCapture } from "./orders-capture.js";
import { type Refund } from "./refund.js";
/**
 * The collection of payments, or transactions, for a purchase unit in an order. For example,
 * authorized payments, captured payments, and refunds.
 */
export type PaymentCollection = {
    /**
     * An array of authorized payments for a purchase unit. A purchase unit can have zero or more
     * authorized payments.
     */
    authorizations?: AuthorizationWithAdditionalData[];
    /**
     * An array of captured payments for a purchase unit. A purchase unit can have zero or more
     * captured payments.
     */
    captures?: OrdersCapture[];
    /** An array of refunds for a purchase unit. A purchase unit can have zero or more refunds. */
    refunds?: Refund[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentCollectionInternalSchema: Schema<PaymentCollection>;
export declare const paymentCollectionSchema: Schema<PaymentCollection>;
