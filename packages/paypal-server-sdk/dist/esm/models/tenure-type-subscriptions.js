import * as s from "../core/validation/index.js";
/**
 * The tenure type of the billing cycle. In case of a plan having trial cycle, only 2 trial cycles
 * are allowed per plan.
 */
export const TenureTypeSubscriptions = {
    /** A regular billing cycle. */
    Regular: "REGULAR",
    /** A trial billing cycle. */
    Trial: "TRIAL",
};
export const tenureTypeSubscriptionsSchema = s.enumOf(TenureTypeSubscriptions);
//# sourceMappingURL=tenure-type-subscriptions.js.map