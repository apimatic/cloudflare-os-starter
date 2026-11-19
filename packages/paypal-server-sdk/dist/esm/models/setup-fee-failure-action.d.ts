import type { EnumSchema } from "../core/validation/schema.js";
/** The action to take on the subscription if the initial payment for the setup fails. */
export declare const SetupFeeFailureAction: {
    /** Continues the subscription if the initial payment for the setup fails. */
    readonly Continue: "CONTINUE";
    /** Cancels the subscription if the initial payment for the setup fails. */
    readonly Cancel: "CANCEL";
};
export type SetupFeeFailureAction = (typeof SetupFeeFailureAction)[keyof typeof SetupFeeFailureAction] | (string & {});
export declare const setupFeeFailureActionSchema: EnumSchema<SetupFeeFailureAction>;
