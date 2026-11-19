import * as s from "../core/validation/index.js";
const phoneNumberSubscriptionsProperties = {
    nationalNumber: s.string(),
    _keysMap: {
        nationalNumber: "national_number",
    },
};
export const phoneNumberSubscriptionsInternalSchema = s.object(phoneNumberSubscriptionsProperties, { additionalProperties: s.json() });
export const phoneNumberSubscriptionsSchema = s.lazySchema(() => s.object({
    ...phoneNumberSubscriptionsProperties,
    nationalNumber: s.string().check(s.minLength(1), s.maxLength(14), s.pattern("^[0-9]{1,14}?$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=phone-number-subscriptions.js.map