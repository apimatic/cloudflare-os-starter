import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
const refundPlatformFeeProperties = {
    amount: moneyInternalSchema,
};
export const refundPlatformFeeInternalSchema = s.object(refundPlatformFeeProperties, { additionalProperties: s.json() });
export const refundPlatformFeeSchema = s.lazySchema(() => s.object({
    ...refundPlatformFeeProperties,
    amount: moneySchema,
}, { additionalProperties: s.json() }));
//# sourceMappingURL=refund-platform-fee.js.map