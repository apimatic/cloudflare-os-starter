import type { JsonValue, Schema } from "../core/validation/schema.js";
import { PayeePaymentMethodPreference } from "./payee-payment-method-preference.js";
import { StandardEntryClassCode } from "./standard-entry-class-code.js";
/** The customer and merchant payment preferences. */
export type PaymentMethodPreference = {
    /** The merchant-preferred payment methods. @default PayeePaymentMethodPreference.Unrestricted */
    payeePreferred?: PayeePaymentMethodPreference;
    /**
     * NACHA (the regulatory body governing the ACH network) requires that API callers (merchants,
     * partners) obtain the consumer’s explicit authorization before initiating a transaction. To stay
     * compliant, you’ll need to make sure that you retain a compliant authorization for each
     * transaction that you originate to the ACH Network using this API. ACH transactions are
     * categorized (using SEC codes) by how you capture authorization from the Receiver (the person
     * whose bank account is being debited or credited). PayPal supports the following SEC codes.
     *
     * @default StandardEntryClassCode.Web
     */
    standardEntryClassCode?: StandardEntryClassCode;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const paymentMethodPreferenceSchema: Schema<PaymentMethodPreference>;
