import * as s from "../core/validation/index.js";
/** The action to take on the subscription if the initial payment for the setup fails. */
export const SetupFeeFailureAction = {
    /** Continues the subscription if the initial payment for the setup fails. */
    Continue: "CONTINUE",
    /** Cancels the subscription if the initial payment for the setup fails. */
    Cancel: "CANCEL",
};
export const setupFeeFailureActionSchema = s.enumOf(SetupFeeFailureAction);
//# sourceMappingURL=setup-fee-failure-action.js.map