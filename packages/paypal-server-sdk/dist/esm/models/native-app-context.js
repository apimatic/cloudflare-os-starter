import * as s from "../core/validation/index.js";
import { osTypeSchema } from "./os-type.js";
const nativeAppContextProperties = {
    osType: s.optional(s.lazy(() => osTypeSchema)),
    osVersion: s.optional(s.string()),
    _keysMap: {
        osType: "os_type",
        osVersion: "os_version",
    },
};
export const nativeAppContextInternalSchema = s.object(nativeAppContextProperties, { additionalProperties: s.json() });
export const nativeAppContextSchema = s.lazySchema(() => s.object({
    ...nativeAppContextProperties,
    osVersion: s.optional(s.string().check(s.minLength(1), s.maxLength(64), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
