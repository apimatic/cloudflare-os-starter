import type { JsonValue, Schema } from "../core/validation/schema.js";
import { DisbursementMode } from "./disbursement-mode.js";
import { type PlatformFee } from "./platform-fee.js";
/**
 * Any additional payment instructions to be consider during payment processing. This processing
 * instruction is applicable for Capturing an order or Authorizing an Order.
 */
export type CapturePaymentInstruction = {
    /**
     * An array of platform or partner fees, commissions, or brokerage fees that associated with the
     * captured payment.
     */
    platformFees?: PlatformFee[];
    /** The funds that are held on behalf of the merchant. @default DisbursementMode.Instant */
    disbursementMode?: DisbursementMode;
    /**
     * FX identifier generated returned by PayPal to be used for payment processing in order to honor
     * FX rate (for eligible integrations) to be used when amount is settled/received into the payee
     * account.
     */
    payeeReceivableFxRateId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const capturePaymentInstructionInternalSchema: Schema<CapturePaymentInstruction>;
export declare const capturePaymentInstructionSchema: Schema<CapturePaymentInstruction>;
