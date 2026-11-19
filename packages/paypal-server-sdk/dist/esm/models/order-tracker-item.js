import * as s from "../core/validation/index.js";
import { universalProductCodeInternalSchema, universalProductCodeSchema, } from "./universal-product-code.js";
const orderTrackerItemProperties = {
    name: s.optional(s.string()),
    quantity: s.optional(s.string()),
    sku: s.optional(s.string()),
    url: s.optional(s.string()),
    imageUrl: s.optional(s.string()),
    upc: s.optional(s.lazy(() => universalProductCodeInternalSchema)),
    _keysMap: {
        imageUrl: "image_url",
    },
};
export const orderTrackerItemInternalSchema = s.object(orderTrackerItemProperties, { additionalProperties: s.json() });
export const orderTrackerItemSchema = s.lazySchema(() => s.object({
    ...orderTrackerItemProperties,
    name: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    quantity: s.optional(s.string().check(s.minLength(1), s.maxLength(10), s.pattern("^[1-9][0-9]{0,9}$"))),
    sku: s.optional(s.string().check(s.minLength(1), s.maxLength(127))),
    url: s.optional(s.string().check(s.minLength(1), s.maxLength(2048), s.url())),
    imageUrl: s.optional(s
        .string()
        .check(s.minLength(1), s.maxLength(2048), s.pattern("^(https:)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg|JPG|GIF|PNG|JPEG)"), s.url())),
    upc: s.optional(s.lazy(() => universalProductCodeSchema)),
}, { additionalProperties: s.json() }));
