import * as s from "../core/validation/index.js";
import { patchOpSchema } from "./patch-op.js";
export const patchSchema = s.object({
    op: patchOpSchema,
    path: s.optional(s.string()),
    // Any JSON value: JSON Patch (RFC 6902) puts no type on `value`, and PayPal patches strings, numbers and objects.
    value: s.optional(s.json()),
    from: s.optional(s.string()),
}, { additionalProperties: s.json() });
