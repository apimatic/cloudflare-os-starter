import * as s from "../core/validation/index.js";
import { callbackEventsSchema } from "./callback-events.js";
const callbackConfigurationProperties = {
    callbackEvents: s.array(s.lazy(() => callbackEventsSchema)),
    callbackUrl: s.string(),
    _keysMap: {
        callbackEvents: "callback_events",
        callbackUrl: "callback_url",
    },
};
export const callbackConfigurationInternalSchema = s.object(callbackConfigurationProperties, { additionalProperties: s.json() });
export const callbackConfigurationSchema = s.lazySchema(() => s.object({
    ...callbackConfigurationProperties,
    callbackEvents: s
        .array(s.lazy(() => callbackEventsSchema))
        .check(s.minLength(1), s.maxLength(5), s.uniqueItems()),
    callbackUrl: s.string().check(s.minLength(10), s.maxLength(2040), s.pattern("^.*$"), s.url()),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=callback-configuration.js.map