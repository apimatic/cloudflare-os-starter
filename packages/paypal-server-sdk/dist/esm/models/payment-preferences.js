import * as s from "../core/validation/index.js";
import { moneyInternalSchema, moneySchema } from "./money.js";
import { SetupFeeFailureAction, setupFeeFailureActionSchema } from "./setup-fee-failure-action.js";
const paymentPreferencesProperties = {
    autoBillOutstanding: s.defaulted(s.boolean(), true),
    setupFee: s.optional(s.lazy(() => moneyInternalSchema)),
    setupFeeFailureAction: s.defaulted(setupFeeFailureActionSchema, SetupFeeFailureAction.Cancel),
    paymentFailureThreshold: s.defaulted(s.int(), 0),
    _keysMap: {
        autoBillOutstanding: "auto_bill_outstanding",
        setupFee: "setup_fee",
        setupFeeFailureAction: "setup_fee_failure_action",
        paymentFailureThreshold: "payment_failure_threshold",
    },
};
export const paymentPreferencesInternalSchema = s.object(paymentPreferencesProperties, { additionalProperties: s.json() });
export const paymentPreferencesSchema = s.lazySchema(() => s.object({
    ...paymentPreferencesProperties,
    setupFee: s.optional(s.lazy(() => moneySchema)),
    paymentFailureThreshold: s.defaulted(s.int().check(s.gte(0), s.lte(999)), 0),
}, { additionalProperties: s.json() }));
