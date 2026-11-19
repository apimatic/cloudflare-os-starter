import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CaptureType } from "./capture-type.js";
import { type Money } from "./money.js";
/** The charge amount from the subscriber. */
export type CaptureSubscriptionRequest = {
    /** The reason or note for the subscription charge. */
    note: string;
    /** The type of capture. */
    captureType: CaptureType;
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount: Money;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const captureSubscriptionRequestInternalSchema: Schema<CaptureSubscriptionRequest>;
export declare const captureSubscriptionRequestSchema: Schema<CaptureSubscriptionRequest>;
