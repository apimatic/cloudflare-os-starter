import * as s from "../core/validation/index.js";
import { PayeePaymentMethodPreference, payeePaymentMethodPreferenceSchema, } from "./payee-payment-method-preference.js";
export const paymentMethodSchema = s.object({
    payeePreferred: s.defaulted(payeePaymentMethodPreferenceSchema, PayeePaymentMethodPreference.Unrestricted),
    _keysMap: {
        payeePreferred: "payee_preferred",
    },
}, { additionalProperties: s.json() });
//# sourceMappingURL=payment-method.js.map