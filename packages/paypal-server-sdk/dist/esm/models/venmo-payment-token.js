import * as s from "../core/validation/index.js";
import { address3InternalSchema, address3Schema } from "./address3.js";
import { customerTypeSchema } from "./customer-type.js";
import { nameInternalSchema, nameSchema } from "./name.js";
import { phoneWithTypeInternalSchema, phoneWithTypeSchema } from "./phone-with-type.js";
import { usagePatternPaymentMethodTokensSchema, } from "./usage-pattern-payment-method-tokens.js";
import { usageTypeSchema } from "./usage-type.js";
import { vaultedDigitalWalletShippingDetailsInternalSchema, vaultedDigitalWalletShippingDetailsSchema, } from "./vaulted-digital-wallet-shipping-details.js";
const venmoPaymentTokenProperties = {
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternPaymentMethodTokensSchema)),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsInternalSchema)),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    usageType: s.optional(s.lazy(() => usageTypeSchema)),
    customerType: s.optional(s.lazy(() => customerTypeSchema)),
    emailAddress: s.optional(s.string()),
    payerId: s.optional(s.string()),
    name: s.optional(s.lazy(() => nameInternalSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeInternalSchema)),
    address: s.optional(s.lazy(() => address3InternalSchema)),
    userName: s.optional(s.string()),
    _keysMap: {
        usagePattern: "usage_pattern",
        permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
        usageType: "usage_type",
        customerType: "customer_type",
        emailAddress: "email_address",
        payerId: "payer_id",
        userName: "user_name",
    },
};
export const venmoPaymentTokenInternalSchema = s.object(venmoPaymentTokenProperties, { additionalProperties: s.json() });
export const venmoPaymentTokenSchema = s.lazySchema(() => s.object({
    ...venmoPaymentTokenProperties,
    description: s.optional(s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$"))),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"))),
    payerId: s.optional(s.string().check(s.minLength(13), s.maxLength(13), s.pattern("^[2-9A-HJ-NP-Z]{13}$"))),
    name: s.optional(s.lazy(() => nameSchema)),
    phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
    address: s.optional(s.lazy(() => address3Schema)),
    userName: s.optional(s.string().check(s.minLength(1), s.maxLength(50), s.pattern("^[-a-zA-Z0-9_]*$"))),
}, { additionalProperties: s.json() }));
