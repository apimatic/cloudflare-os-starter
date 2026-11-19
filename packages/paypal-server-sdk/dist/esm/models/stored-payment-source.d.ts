import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type NetworkTransaction } from "./network-transaction.js";
import { type PaymentInitiator } from "./payment-initiator.js";
import { type StoredPaymentSourcePaymentType } from "./stored-payment-source-payment-type.js";
import { StoredPaymentSourceUsageType } from "./stored-payment-source-usage-type.js";
/**
 * Provides additional details to process a payment using a `payment_source` that has been stored or
 * is intended to be stored (also referred to as stored_credential or card-on-file). Parameter
 * compatibility: `payment_type=ONE_TIME` is compatible only with `payment_initiator=CUSTOMER`.
 * `usage=FIRST` is compatible only with `payment_initiator=CUSTOMER`.
 * `previous_transaction_reference` or `previous_network_transaction_reference` is compatible only
 * with `payment_initiator=MERCHANT`. Only one of the parameters - `previous_transaction_reference`
 * and `previous_network_transaction_reference` - can be present in the request.
 */
export type StoredPaymentSource = {
    /** The person or party who initiated or triggered the payment. */
    paymentInitiator: PaymentInitiator;
    /** Indicates the type of the stored payment_source payment. */
    paymentType: StoredPaymentSourcePaymentType;
    /**
     * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also
     * referred to as stored credential or card on file).
     *
     * @default StoredPaymentSourceUsageType.Derived
     */
    usage?: StoredPaymentSourceUsageType;
    /** Reference values used by the card network to identify a transaction. */
    previousNetworkTransactionReference?: NetworkTransaction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const storedPaymentSourceInternalSchema: Schema<StoredPaymentSource>;
export declare const storedPaymentSourceSchema: Schema<StoredPaymentSource>;
