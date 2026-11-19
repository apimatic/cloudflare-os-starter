import * as s from "../core/validation/index.js";
import { taxIdTypeSchema } from "./tax-id-type.js";
const taxInfoProperties = {
    taxId: s.string(),
    taxIdType: taxIdTypeSchema,
    _keysMap: {
        taxId: "tax_id",
        taxIdType: "tax_id_type",
    },
};
export const taxInfoInternalSchema = s.object(taxInfoProperties, {
    additionalProperties: s.json(),
});
export const taxInfoSchema = s.lazySchema(() => s.object({
    ...taxInfoProperties,
    taxId: s.string().check(s.minLength(1), s.maxLength(14), s.pattern("([a-zA-Z0-9])")),
}, { additionalProperties: s.json() }));
