import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CapturePaymentInstruction } from "./capture-payment-instruction.js";
import { type Money } from "./money.js";
/** Captures either a portion or the full authorized amount of an authorized payment. */
export type CaptureRequest = {
    /** The currency and amount for a financial transaction, such as a balance or payment due. */
    amount?: Money;
    /**
     * The API caller-provided external invoice number for this order. Appears in both the payer's
     * transaction history and the emails that the payer receives.
     */
    invoiceId?: string;
    /**
     * Indicates whether you can make additional captures against the authorized payment. Set to
     * `true` if you do not intend to capture additional payments against the authorization. Set to
     * `false` if you intend to capture additional payments against the authorization.
     *
     * @default false
     */
    finalCapture?: boolean;
    /**
     * Any additional payment instructions to be consider during payment processing. This processing
     * instruction is applicable for Capturing an order or Authorizing an Order.
     */
    paymentInstruction?: CapturePaymentInstruction;
    /**
     * An informational note about this settlement. Appears in both the payer's transaction history
     * and the emails that the payer receives.
     */
    noteToPayer?: string;
    /** The payment descriptor on the payer's account statement. */
    softDescriptor?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const captureRequestInternalSchema: Schema<CaptureRequest>;
export declare const captureRequestSchema: Schema<CaptureRequest>;
