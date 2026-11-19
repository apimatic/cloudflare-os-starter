import * as s from "../core/validation/index.js";
import { addressInternalSchema, addressSchema } from "./address.js";
import { fulfillmentTypeSchema } from "./fulfillment-type.js";
import { phoneNumberWithCountryCodeInternalSchema, phoneNumberWithCountryCodeSchema, } from "./phone-number-with-country-code.js";
import { shippingNameInternalSchema, shippingNameSchema } from "./shipping-name.js";
import { shippingOptionInternalSchema, shippingOptionSchema, } from "./shipping-option.js";
const shippingDetailsProperties = {
    name: s.optional(s.lazy(() => shippingNameInternalSchema)),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeInternalSchema)),
    type: s.optional(s.lazy(() => fulfillmentTypeSchema)),
    options: s.optional(s.array(s.lazy(() => shippingOptionInternalSchema))),
    address: s.optional(s.lazy(() => addressInternalSchema)),
    _keysMap: {
        emailAddress: "email_address",
        phoneNumber: "phone_number",
    },
};
export const shippingDetailsInternalSchema = s.object(shippingDetailsProperties, { additionalProperties: s.json() });
export const shippingDetailsSchema = s.lazySchema(() => s.object({
    ...shippingDetailsProperties,
    name: s.optional(s.lazy(() => shippingNameSchema)),
    emailAddress: s.optional(s
        .string()
        .check(s.minLength(3), s.maxLength(254), s.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"))),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    options: s.optional(s.array(s.lazy(() => shippingOptionSchema)).check(s.minLength(0), s.maxLength(10))),
    address: s.optional(s.lazy(() => addressSchema)),
}, { additionalProperties: s.json() }));
