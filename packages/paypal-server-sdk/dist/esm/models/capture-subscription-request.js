import * as s from "../core/validation/index.js";
import { captureTypeSchema } from "./capture-type.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const captureSubscriptionRequestProperties = {
    note: s.string(),
    captureType: captureTypeSchema,
    amount: moneyInternalSchema,
    _keysMap: {
        captureType: "capture_type",
    },
};
export const captureSubscriptionRequestInternalSchema = s.object(captureSubscriptionRequestProperties, {
    additionalProperties: s.json(),
});
export const captureSubscriptionRequestSchema = s.lazySchema(() => s.object({
    ...captureSubscriptionRequestProperties,
    note: s.string().check(s.minLength(1), s.maxLength(128), s.pattern("^.*$")),
    amount: moneySchema,
}, { additionalProperties: s.json() }));
