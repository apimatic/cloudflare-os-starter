import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { phoneNumberInternalSchema, phoneNumberSchema } from "./phone-number.js";
import { ReturnFlow, returnFlowSchema } from "./return-flow.js";
import { venmoWalletAttributesResponseInternalSchema, venmoWalletAttributesResponseSchema, } from "./venmo-wallet-attributes-response.js";
const venmoWalletResponseProperties = {
    emailAddress: s.optional(s.string()),
    accountId: s.optional(s.string()),
    userName: s.optional(s.string()),
    name: s.optional(s.lazy(() => nameInternalSchema)),
    phoneNumber: s.optional(s.lazy(() => phoneNumberInternalSchema)),
    address: s.optional(s.lazy(() => addressInternalSchema)),
    returnFlow: s.defaulted(returnFlowSchema, ReturnFlow.Auto),
    attributes: s.optional(s.lazy(() => venmoWalletAttributesResponseInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        accountId: "account_id",
        userName: "user_name",
        phoneNumber: "phone_number",
        returnFlow: "return_flow",
    },
};
export const venmoWalletResponseInternalSchema = s.object(venmoWalletResponseProperties, { additionalProperties: s.json() });
export const venmoWalletResponseSchema = s.lazySchema(() => s.object({
    ...venmoWalletResponseProperties,
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    accountId: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("^[2-9A-HJ-NP-Z]{13}$"))),
    userName: s.optional(s.string().check(s.minLength(1), s.maxLength(50), s.pattern("^[-a-zA-Z0-9_]*$"))),
    name: s.optional(s.lazy(() => nameSchema)),
    phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
    address: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => venmoWalletAttributesResponseSchema)),
}, { additionalProperties: s.json() }));
