import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const reauthorizeRequestProperties = {
    amount: s.optional(s.lazy(() => moneyInternalSchema)),
};
export const reauthorizeRequestInternalSchema = s.object(reauthorizeRequestProperties, { additionalProperties: s.json() });
export const reauthorizeRequestSchema = s.lazySchema(() => s.object({
    ...reauthorizeRequestProperties,
    amount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
