import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { phoneWithTypeInternalSchema, phoneWithTypeSchema } from "./phone-with-type.js";
import { taxInfoInternalSchema, taxInfoSchema } from "./tax-info.js";
const payerProperties = {
    emailAddress: s.optional(s.string()),
    payerId: s.optional(s.string()),
    name: s.optional(s.lazy(() => nameInternalSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeInternalSchema)),
    birthDate: s.optional(s.string()),
    taxInfo: s.optional(s.lazy(() => taxInfoInternalSchema)),
    address: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        payerId: "payer_id",
        birthDate: "birth_date",
        taxInfo: "tax_info",
    },
};
export const payerInternalSchema = s.object(payerProperties, {
    additionalProperties: s.json(),
});
export const payerSchema = s.lazySchema(() => s.object({
    ...payerProperties,
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    payerId: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("^[2-9A-HJ-NP-Z]{13}$"))),
    name: s.optional(s.lazy(() => nameSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
    birthDate: s.optional(s
        .string()
        .check(s.minLength(10), s.maxLength(10), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"))),
    taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
    address: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payer.js.map