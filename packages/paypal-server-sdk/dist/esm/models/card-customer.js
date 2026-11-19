import * as s from "../core/validation/index.js";
import { phoneWithTypeSubscriptionsInternalSchema, phoneWithTypeSubscriptionsSchema, } from "./phone-with-type-subscriptions.js";
const cardCustomerProperties = {
    id: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phone: s.optional(s.lazy(() => phoneWithTypeSubscriptionsInternalSchema)),
    merchantCustomerId: s.optional(s.string()),
    _keysMap: {
        emailAddress: "email_address",
        merchantCustomerId: "merchant_customer_id",
    },
};
export const cardCustomerInternalSchema = s.object(cardCustomerProperties, { additionalProperties: s.json() });
export const cardCustomerSchema = s.lazySchema(() => s.object({
    ...cardCustomerProperties,
    id: s.optional(s.string().check(s.minLength(1), s.maxLength(22), s.pattern("^[0-9a-zA-Z_-]+$"))),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    phone: s.optional(s.lazy(() => phoneWithTypeSubscriptionsSchema)),
    merchantCustomerId: s.optional(s.string().check(s.minLength(1), s.maxLength(64), s.pattern("^[0-9a-zA-Z-_.^*$@#]+$"))),
}, { additionalProperties: s.json() }));
