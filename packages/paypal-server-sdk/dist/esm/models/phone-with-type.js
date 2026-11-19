import * as s from "../core/validation/index.js";
import { phoneNumberInternalSchema, phoneNumberSchema } from "./phone-number.js";
import { phoneTypeSchema } from "./phone-type.js";
const phoneWithTypeProperties = {
    phoneType: s.optional(s.lazy(() => phoneTypeSchema)),
    phoneNumber: phoneNumberInternalSchema,
    _keysMap: {
        phoneType: "phone_type",
        phoneNumber: "phone_number",
    },
};
export const phoneWithTypeInternalSchema = s.object(phoneWithTypeProperties, { additionalProperties: s.json() });
export const phoneWithTypeSchema = s.lazySchema(() => s.object({
    ...phoneWithTypeProperties,
    phoneNumber: phoneNumberSchema,
}, { additionalProperties: s.json() }));
