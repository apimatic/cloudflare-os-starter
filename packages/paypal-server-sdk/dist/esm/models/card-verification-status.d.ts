import type { EnumSchema } from "../core/validation/schema.js";
/** Verification status of Card. */
export declare const CardVerificationStatus: {
    /** Card has been verified */
    readonly Verified: "VERIFIED";
    /** Card verification has failed */
    readonly Failed: "FAILED";
};
export type CardVerificationStatus = (typeof CardVerificationStatus)[keyof typeof CardVerificationStatus] | (string & {});
export declare const cardVerificationStatusSchema: EnumSchema<CardVerificationStatus>;
