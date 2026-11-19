import * as s from "../core/validation/index.js";
import { DisbursementMode, disbursementModeSchema } from "./disbursement-mode.js";
import { platformFeeInternalSchema, platformFeeSchema } from "./platform-fee.js";
const paymentInstructionProperties = {
    platformFees: s.optional(s.array(s.lazy(() => platformFeeInternalSchema))),
    disbursementMode: s.defaulted(disbursementModeSchema, DisbursementMode.Instant),
    payeePricingTierId: s.optional(s.string()),
    payeeReceivableFxRateId: s.optional(s.string()),
    _keysMap: {
        platformFees: "platform_fees",
        disbursementMode: "disbursement_mode",
        payeePricingTierId: "payee_pricing_tier_id",
        payeeReceivableFxRateId: "payee_receivable_fx_rate_id",
    },
};
export const paymentInstructionInternalSchema = s.object(paymentInstructionProperties, { additionalProperties: s.json() });
export const paymentInstructionSchema = s.lazySchema(() => s.object({
    ...paymentInstructionProperties,
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema)).check(s.minLength(0), s.maxLength(1))),
    payeePricingTierId: s.optional(s.string().check(s.minLength(1), s.maxLength(20), s.pattern("^.*$"))),
    payeeReceivableFxRateId: s.optional(s.string().check(s.minLength(1), s.maxLength(4000), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=payment-instruction.js.map