import * as s from "../core/validation/index.js";
import { PayeePaymentMethodPreference, payeePaymentMethodPreferenceSchema, } from "./payee-payment-method-preference.js";
import { StandardEntryClassCode, standardEntryClassCodeSchema } from "./standard-entry-class-code.js";
export const paymentMethodPreferenceSchema = s.object({
    payeePreferred: s.defaulted(payeePaymentMethodPreferenceSchema, PayeePaymentMethodPreference.Unrestricted),
    standardEntryClassCode: s.defaulted(standardEntryClassCodeSchema, StandardEntryClassCode.Web),
    _keysMap: {
        payeePreferred: "payee_preferred",
        standardEntryClassCode: "standard_entry_class_code",
    },
}, { additionalProperties: s.json() });
