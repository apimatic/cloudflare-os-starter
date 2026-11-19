import * as s from "../core/validation/index.js";
import { DisbursementMode, disbursementModeSchema } from "./disbursement-mode.js";
import { platformFeeInternalSchema, platformFeeSchema } from "./platform-fee.js";
const capturePaymentInstructionProperties = {
    platformFees: s.optional(s.array(s.lazy(() => platformFeeInternalSchema))),
    disbursementMode: s.defaulted(disbursementModeSchema, DisbursementMode.Instant),
    payeeReceivableFxRateId: s.optional(s.string()),
    _keysMap: {
        platformFees: "platform_fees",
        disbursementMode: "disbursement_mode",
        payeeReceivableFxRateId: "payee_receivable_fx_rate_id",
    },
};
export const capturePaymentInstructionInternalSchema = s.object(capturePaymentInstructionProperties, {
    additionalProperties: s.json(),
});
export const capturePaymentInstructionSchema = s.lazySchema(() => s.object({
    ...capturePaymentInstructionProperties,
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema)).check(s.minLength(0), s.maxLength(1))),
    payeeReceivableFxRateId: s.optional(s.string().check(s.minLength(1), s.maxLength(4000), s.pattern("^.*$"))),
}, { additionalProperties: s.json() }));
