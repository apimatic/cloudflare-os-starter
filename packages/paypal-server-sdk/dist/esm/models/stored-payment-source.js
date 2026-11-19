import * as s from "../core/validation/index.js";
import { networkTransactionInternalSchema, networkTransactionSchema, } from "./network-transaction.js";
import { paymentInitiatorSchema } from "./payment-initiator.js";
import { storedPaymentSourcePaymentTypeSchema, } from "./stored-payment-source-payment-type.js";
import { StoredPaymentSourceUsageType, storedPaymentSourceUsageTypeSchema, } from "./stored-payment-source-usage-type.js";
const storedPaymentSourceProperties = {
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
export const storedPaymentSourceInternalSchema = s.object(storedPaymentSourceProperties, { additionalProperties: s.json() });
export const storedPaymentSourceSchema = s.lazySchema(() => s.object({
    ...storedPaymentSourceProperties,
    previousNetworkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=stored-payment-source.js.map