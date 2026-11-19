import * as s from "../core/validation/index.js";
import { phoneNumberSubscriptionsInternalSchema, phoneNumberSubscriptionsSchema, } from "./phone-number-subscriptions.js";
import { phoneTypeSubscriptionsSchema } from "./phone-type-subscriptions.js";
const phoneWithTypeSubscriptionsProperties = {
    phoneType: s.optional(s.lazy(() => phoneTypeSubscriptionsSchema)),
    phoneNumber: phoneNumberSubscriptionsInternalSchema,
    _keysMap: {
        phoneType: "phone_type",
        phoneNumber: "phone_number",
    },
};
export const phoneWithTypeSubscriptionsInternalSchema = s.object(phoneWithTypeSubscriptionsProperties, {
    additionalProperties: s.json(),
});
export const phoneWithTypeSubscriptionsSchema = s.lazySchema(() => s.object({
    ...phoneWithTypeSubscriptionsProperties,
    phoneNumber: phoneNumberSubscriptionsSchema,
}, { additionalProperties: s.json() }));
