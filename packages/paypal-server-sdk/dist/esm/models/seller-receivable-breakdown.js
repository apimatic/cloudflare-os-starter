import * as s from "../core/validation/index.js";
import { exchangeRateInternalSchema, exchangeRateSchema } from "./exchange-rate.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { platformFeeInternalSchema, platformFeeSchema } from "./platform-fee.js";
const sellerReceivableBreakdownProperties = {
    grossAmount: moneyInternalSchema,
    paypalFee: s.optional(s.lazy(() => moneyInternalSchema)),
    paypalFeeInReceivableCurrency: s.optional(s.lazy(() => moneyInternalSchema)),
    netAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    receivableAmount: s.optional(s.lazy(() => moneyInternalSchema)),
    exchangeRate: s.optional(s.lazy(() => exchangeRateInternalSchema)),
    platformFees: s.optional(s.array(s.lazy(() => platformFeeInternalSchema))),
    _keysMap: {
        grossAmount: "gross_amount",
        paypalFee: "paypal_fee",
        paypalFeeInReceivableCurrency: "paypal_fee_in_receivable_currency",
        netAmount: "net_amount",
        receivableAmount: "receivable_amount",
        exchangeRate: "exchange_rate",
        platformFees: "platform_fees",
    },
};
export const sellerReceivableBreakdownInternalSchema = s.object(sellerReceivableBreakdownProperties, {
    additionalProperties: s.json(),
});
export const sellerReceivableBreakdownSchema = s.lazySchema(() => s.object({
    ...sellerReceivableBreakdownProperties,
    grossAmount: moneySchema,
    paypalFee: s.optional(s.lazy(() => moneySchema)),
    paypalFeeInReceivableCurrency: s.optional(s.lazy(() => moneySchema)),
    netAmount: s.optional(s.lazy(() => moneySchema)),
    receivableAmount: s.optional(s.lazy(() => moneySchema)),
    exchangeRate: s.optional(s.lazy(() => exchangeRateSchema)),
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema)).check(s.minLength(0), s.maxLength(1))),
}, { additionalProperties: s.json() }));
//# sourceMappingURL=seller-receivable-breakdown.js.map