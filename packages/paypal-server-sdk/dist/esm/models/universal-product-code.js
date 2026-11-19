import * as s from "../core/validation/index.js";
import { upcTypeSchema } from "./upc-type.js";
const universalProductCodeProperties = {
    type: upcTypeSchema,
    code: s.string(),
};
export const universalProductCodeInternalSchema = s.object(universalProductCodeProperties, { additionalProperties: s.json() });
export const universalProductCodeSchema = s.lazySchema(() => s.object({
    ...universalProductCodeProperties,
    code: s.string().check(s.minLength(6), s.maxLength(17), s.pattern("^[0-9]{0,17}$")),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=universal-product-code.js.map