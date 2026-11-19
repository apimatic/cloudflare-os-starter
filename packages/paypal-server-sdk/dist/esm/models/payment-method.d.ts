import type { JsonValue, Schema } from "../core/validation/schema.js";
import { PayeePaymentMethodPreference } from "./payee-payment-method-preference.js";
/** The customer and merchant payment preferences. */
export type PaymentMethod = {
    /** The merchant-preferred payment methods. @default PayeePaymentMethodPreference.Unrestricted */
    payeePreferred?: PayeePaymentMethodPreference;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentMethodSchema: Schema<PaymentMethod>;
