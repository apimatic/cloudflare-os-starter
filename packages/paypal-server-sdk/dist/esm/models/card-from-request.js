import * as s from "../core/validation/index.js";
const cardFromRequestProperties = {
    expiry: s.optional(s.string()),
    lastDigits: s.optional(s.string()),
    _keysMap: {
        lastDigits: "last_digits",
    },
};
export const cardFromRequestInternalSchema = s.object(cardFromRequestProperties, { additionalProperties: s.json() });
export const cardFromRequestSchema = s.lazySchema(() => s.object({
    ...cardFromRequestProperties,
    expiry: s.optional(s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$"))),
    lastDigits: s.optional(s.string().check(s.minLength(2), s.maxLength(4), s.pattern("[0-9]{2,}"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=card-from-request.js.map