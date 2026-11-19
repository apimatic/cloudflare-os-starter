import type { EnumSchema } from "../core/validation/schema.js";
/** Transactions status result identifier. The outcome of the issuer's authentication. */
export declare const PaResStatus: {
    /** Successful authentication. */
    readonly Y: "Y";
    /** Failed authentication / account not verified / transaction denied. */
    readonly N: "N";
    /** Unable to complete authentication. */
    readonly U: "U";
    /** Successful attempts transaction. */
    readonly A: "A";
    /** Challenge required for authentication. */
    readonly C: "C";
    /** Authentication rejected (merchant must not submit for authorization). */
    readonly R: "R";
    /** Challenge required; decoupled authentication confirmed. */
    readonly D: "D";
    /** Informational only; 3DS requestor challenge preference acknowledged. */
    readonly I: "I";
};
export type PaResStatus = (typeof PaResStatus)[keyof typeof PaResStatus] | (string & {});
export declare const paResStatusSchema: EnumSchema<PaResStatus>;
