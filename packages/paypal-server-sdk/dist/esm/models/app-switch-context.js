import * as s from "../core/validation/index.js";
import { mobileWebContextInternalSchema, mobileWebContextSchema, } from "./mobile-web-context.js";
import { nativeAppContextInternalSchema, nativeAppContextSchema, } from "./native-app-context.js";
const appSwitchContextProperties = {
    nativeApp: s.optional(s.lazy(() => nativeAppContextInternalSchema)),
    mobileWeb: s.optional(s.lazy(() => mobileWebContextInternalSchema)),
    _keysMap: {
        nativeApp: "native_app",
        mobileWeb: "mobile_web",
    },
};
export const appSwitchContextInternalSchema = s.object(appSwitchContextProperties, { additionalProperties: s.json() });
export const appSwitchContextSchema = s.lazySchema(() => s.object({
    ...appSwitchContextProperties,
    nativeApp: s.optional(s.lazy(() => nativeAppContextSchema)),
    mobileWeb: s.optional(s.lazy(() => mobileWebContextSchema)),
}, { additionalProperties: s.json() }));
