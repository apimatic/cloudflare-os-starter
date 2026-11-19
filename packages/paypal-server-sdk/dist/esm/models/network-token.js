import * as s from "../core/validation/index.js";
import { eciFlagSchema } from "./eci-flag.js";
const networkTokenProperties = {
    number: s.string(),
    expiry: s.string(),
    cryptogram: s.optional(s.string()),
    eciFlag: s.optional(s.lazy(() => eciFlagSchema)),
    tokenRequestorId: s.optional(s.string()),
    _keysMap: {
        eciFlag: "eci_flag",
        tokenRequestorId: "token_requestor_id",
    },
};
export const networkTokenInternalSchema = s.object(networkTokenProperties, { additionalProperties: s.json() });
export const networkTokenSchema = s.lazySchema(() => s.object({
    ...networkTokenProperties,
    number: s.string().check(s.minLength(13), s.maxLength(19), s.pattern("^[0-9]{13,19}$")),
    expiry: s.string().check(s.minLength(7), s.maxLength(7), s.pattern("^[0-9]{4}-(0[1-9]|1[0-2])$")),
    cryptogram: s.optional(s.string().check(s.minLength(28), s.maxLength(32), s.pattern("^.*$"))),
    tokenRequestorId: s.optional(s.string().check(s.minLength(1), s.maxLength(11), s.pattern("^[0-9A-Z_]+$"))),
}, { additionalProperties: s.json() }));
