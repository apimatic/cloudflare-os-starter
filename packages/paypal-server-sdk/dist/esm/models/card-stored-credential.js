import * as s from "../core/validation/index.js";
import { networkTransactionInternalSchema, networkTransactionSchema, } from "./network-transaction.js";
import { paymentInitiatorSchema } from "./payment-initiator.js";
import { storedPaymentSourcePaymentTypeSchema, } from "./stored-payment-source-payment-type.js";
import { StoredPaymentSourceUsageType, storedPaymentSourceUsageTypeSchema, } from "./stored-payment-source-usage-type.js";
const cardStoredCredentialProperties = {
    paymentInitiator: paymentInitiatorSchema,
    paymentType: storedPaymentSourcePaymentTypeSchema,
    usage: s.defaulted(storedPaymentSourceUsageTypeSchema, StoredPaymentSourceUsageType.Derived),
    previousNetworkTransactionReference: s.optional(s.lazy(() => networkTransactionInternalSchema)),
    _keysMap: {
        paymentInitiator: "payment_initiator",
        paymentType: "payment_type",
        previousNetworkTransactionReference: "previous_network_transaction_reference",
    },
};
export const cardStoredCredentialInternalSchema = s.object(cardStoredCredentialProperties, { additionalProperties: s.json() });
export const cardStoredCredentialSchema = s.lazySchema(() => s.object({
    ...cardStoredCredentialProperties,
    previousNetworkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-stored-credential.js.map