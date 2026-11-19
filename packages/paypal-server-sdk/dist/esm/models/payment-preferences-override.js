import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { setupFeeFailureActionSchema } from "./setup-fee-failure-action.js";
const paymentPreferencesOverrideProperties = {
    autoBillOutstanding: s.optional(s.boolean()),
    setupFee: s.optional(s.lazy(() => moneyInternalSchema)),
    setupFeeFailureAction: s.optional(s.lazy(() => setupFeeFailureActionSchema)),
    paymentFailureThreshold: s.optional(s.int()),
    _keysMap: {
        autoBillOutstanding: "auto_bill_outstanding",
        setupFee: "setup_fee",
        setupFeeFailureAction: "setup_fee_failure_action",
        paymentFailureThreshold: "payment_failure_threshold",
    },
};
export const paymentPreferencesOverrideInternalSchema = s.object(paymentPreferencesOverrideProperties, {
    additionalProperties: s.json(),
});
export const paymentPreferencesOverrideSchema = s.lazySchema(() => s.object({
    ...paymentPreferencesOverrideProperties,
    setupFee: s.optional(s.lazy(() => moneySchema)),
    paymentFailureThreshold: s.optional(s.int().check(s.gte(0), s.lte(999))),
}, { additionalProperties: s.json() }));
