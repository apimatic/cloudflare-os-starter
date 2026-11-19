import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { payeeBaseInternalSchema, payeeBaseSchema } from "./payee-base.js";
const platformFeeProperties = {
    amount: moneyInternalSchema,
    payee: s.optional(s.lazy(() => payeeBaseInternalSchema)),
};
export const platformFeeInternalSchema = s.object(platformFeeProperties, {
    additionalProperties: s.json(),
});
export const platformFeeSchema = s.lazySchema(() => s.object({
    ...platformFeeProperties,
    amount: moneySchema,
    payee: s.optional(s.lazy(() => payeeBaseSchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=platform-fee.js.map