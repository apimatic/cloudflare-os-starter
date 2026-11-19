import * as s from "../core/validation/index.js";
const phoneNumberProperties = {
    nationalNumber: s.string(),
    _keysMap: {
        nationalNumber: "national_number",
    },
};
export const phoneNumberInternalSchema = s.object(phoneNumberProperties, {
    additionalProperties: s.json(),
});
export const phoneNumberSchema = s.lazySchema(() => s.object({
    ...phoneNumberProperties,
    nationalNumber: s.string().check(s.minLength(1), s.maxLength(14), s.pattern("^[0-9]{1,14}?$")),
}, { additionalProperties: s.json() }));
