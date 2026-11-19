import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { netAmountBreakdownItemInternalSchema, netAmountBreakdownItemSchema, } from "./net-amount-breakdown-item.js";
import { platformFeeInternalSchema, platformFeeSchema } from "./platform-fee.js";
const sellerPayableBreakdownProperties = {
    grossAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    paypalFee: s.optional(s.lazy(() => moneyInternalSchema)),
    paypalFeeInReceivableCurrency: s.optional(s.lazy(() => moneyInternalSchema)),
    netAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    netAmountInReceivableCurrency: s.optional(s.lazy(() => moneyInternalSchema)),
    platformFees: s.optional(s.array(s.lazy(() => platformFeeInternalSchema))),
    netAmountBreakdown: s.optional(s.array(s.lazy(() => netAmountBreakdownItemInternalSchema))),
    totalRefundedAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    _keysMap: {
        grossAmount: "gross_amount",
        paypalFee: "paypal_fee",
        paypalFeeInReceivableCurrency: "paypal_fee_in_receivable_currency",
        netAmount: "net_amount",
        netAmountInReceivableCurrency: "net_amount_in_receivable_currency",
        platformFees: "platform_fees",
        netAmountBreakdown: "net_amount_breakdown",
        totalRefundedAmount: "total_refunded_amount",
    },
};
export const sellerPayableBreakdownInternalSchema = s.object(sellerPayableBreakdownProperties, { additionalProperties: s.json() });
export const sellerPayableBreakdownSchema = s.lazySchema(() => s.object({
    ...sellerPayableBreakdownProperties,
    grossAmount: s.optional(s.lazy(() => moneySchema)),
    paypalFee: s.optional(s.lazy(() => moneySchema)),
    paypalFeeInReceivableCurrency: s.optional(s.lazy(() => moneySchema)),
    netAmount: s.optional(s.lazy(() => moneySchema)),
    netAmountInReceivableCurrency: s.optional(s.lazy(() => moneySchema)),
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema)).check(s.minLength(0), s.maxLength(1))),
    netAmountBreakdown: s.optional(s.array(s.lazy(() => netAmountBreakdownItemSchema))),
    totalRefundedAmount: s.optional(s.lazy(() => moneySchema)),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=seller-payable-breakdown.js.map