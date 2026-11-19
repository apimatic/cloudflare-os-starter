import * as s from "../core/validation/index.js";
const storeInformationProperties = {
    storeId: s.optional(s.string()),
    terminalId: s.optional(s.string()),
    _keysMap: {
        storeId: "store_id",
        terminalId: "terminal_id",
    },
};
export const storeInformationInternalSchema = s.object(storeInformationProperties, { additionalProperties: s.json() });
export const storeInformationSchema = s.lazySchema(() => s.object({
    ...storeInformationProperties,
    storeId: s.optional(s.string().check(s.minLength(1), s.maxLength(100), s.pattern("^[a-zA-Z0-9]*$"))),
    terminalId: s.optional(s.string().check(s.minLength(1), s.maxLength(60), s.pattern("^[a-zA-Z0-9]*$"))),
}, { additionalProperties: s.json() }));
