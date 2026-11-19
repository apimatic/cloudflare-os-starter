import * as s from "../core/validation/index.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { phoneWithTypeInternalSchema, phoneWithTypeSchema } from "./phone-with-type.js";
const venmoWalletCustomerInformationProperties = {
    id: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phone: s.optional(s.lazy(() => phoneWithTypeInternalSchema)),
    name: s.optional(s.lazy(() => nameInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
    },
};
export const venmoWalletCustomerInformationInternalSchema = s.object(venmoWalletCustomerInformationProperties, {
    additionalProperties: s.json(),
});
export const venmoWalletCustomerInformationSchema = s.lazySchema(() => s.object({
    ...venmoWalletCustomerInformationProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(22), s.pattern("^[0-9a-zA-Z_-]+$"))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
    name: s.optional(s.lazy(() => nameSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=venmo-wallet-customer-information.js.map