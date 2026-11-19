import * as s from "../core/validation/index.js";
const subscriptionPayerNameProperties = {
    prefix: s.optional(s.string()),
    givenName: s.optional(s.string()),
    surname: s.optional(s.string()),
    middleName: s.optional(s.string()),
    suffix: s.optional(s.string()),
    fullName: s.optional(s.string()),
    _keysMap: {
        givenName: "given_name",
        middleName: "middle_name",
        fullName: "full_name",
    },
};
export const subscriptionPayerNameInternalSchema = s.object(subscriptionPayerNameProperties, { additionalProperties: s.json() });
export const subscriptionPayerNameSchema = s.lazySchema(() => s.object({
    ...subscriptionPayerNameProperties,
    prefix: s.optional(s.string().check(s.maxLength(140))),
    givenName: s.optional(s.string().check(s.maxLength(140))),
    surname: s.optional(s.string().check(s.maxLength(140))),
    middleName: s.optional(s.string().check(s.maxLength(140))),
    suffix: s.optional(s.string().check(s.maxLength(140))),
    fullName: s.optional(s.string().check(s.maxLength(300))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=subscription-payer-name.js.map