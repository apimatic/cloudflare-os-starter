import * as s from "../core/validation/index.js";
import { payerNameInternalSchema, payerNameSchema } from "./payer-name.js";
import { phoneNumberWithExtensionInternalSchema, phoneNumberWithExtensionSchema, } from "./phone-number-with-extension.js";
import { simplePostalAddressCoarseGrainedInternalSchema, simplePostalAddressCoarseGrainedSchema, } from "./simple-postal-address-coarse-grained.js";
const payerInformationProperties = {
    accountId: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithExtensionInternalSchema)),
    addressStatus: s.optional(s.string()),
    payerStatus: s.optional(s.string()),
    payerName: s.optional(s.lazy(() => payerNameInternalSchema)),
    countryCode: s.optional(s.string()),
    address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedInternalSchema)),
    _keysMap: {
        accountId: "account_id",
        emailAddress: "email_address",
        phoneNumber: "phone_number",
        addressStatus: "address_status",
        payerStatus: "payer_status",
        payerName: "payer_name",
        countryCode: "country_code",
    },
};
export const payerInformationInternalSchema = s.object(payerInformationProperties, { additionalProperties: s.json() });
export const payerInformationSchema = s.lazySchema(() => s.object({
    ...payerInformationProperties,
    accountId: s.optional(s.string().check(s.minLength(1), s.maxLength(13), s.pattern("^[a-zA-Z0-9]*$"))),
    emailAddress: s.optional(s.string().check(s.minLength(3), s.maxLength(254), s.pattern('^.+@[^"\\-].+$'))),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithExtensionSchema)),
    addressStatus: s.optional(s.string().check(s.minLength(1), s.maxLength(1), s.pattern("^[N|Y]$"))),
    payerStatus: s.optional(s.string().check(s.minLength(1), s.maxLength(1), s.pattern("^[N|Y]$"))),
    payerName: s.optional(s.lazy(() => payerNameSchema)),
    countryCode: s.optional(s.string().check(s.minLength(2), s.maxLength(2), s.pattern("^([A-Z]{2}|C2)$"))),
    address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payer-information.js.map