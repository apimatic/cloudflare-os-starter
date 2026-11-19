import * as s from "../core/validation/index.js";
import { paymentInitiatorSchema } from "./payment-initiator.js";
import { StoredPaymentSourceUsageType, storedPaymentSourceUsageTypeSchema, } from "./stored-payment-source-usage-type.js";
import { usagePatternSchema } from "./usage-pattern.js";
export const payPalWalletStoredCredentialSchema = s.object({
    paymentInitiator: paymentInitiatorSchema,
    chargePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usage: s.defaulted(storedPaymentSourceUsageTypeSchema, StoredPaymentSourceUsageType.Derived),
    _keysMap: {
        paymentInitiator: "payment_initiator",
        chargePattern: "charge_pattern",
        usagePattern: "usage_pattern",
    },
}, { additionalProperties: s.json() });
