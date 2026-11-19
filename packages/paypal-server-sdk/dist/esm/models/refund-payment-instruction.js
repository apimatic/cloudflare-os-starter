import * as s from "../core/validation/index.js";
import { refundPlatformFeeInternalSchema, refundPlatformFeeSchema, } from "./refund-platform-fee.js";
const refundPaymentInstructionProperties = {
    platformFees: s.optional(s.array(s.lazy(() => refundPlatformFeeInternalSchema))),
    _keysMap: {
        platformFees: "platform_fees",
    },
};
export const refundPaymentInstructionInternalSchema = s.object(refundPaymentInstructionProperties, { additionalProperties: s.json() });
export const refundPaymentInstructionSchema = s.lazySchema(() => s.object({
    ...refundPaymentInstructionProperties,
    platformFees: s.optional(s.array(s.lazy(() => refundPlatformFeeSchema)).check(s.minLength(0), s.maxLength(1))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=refund-payment-instruction.js.map