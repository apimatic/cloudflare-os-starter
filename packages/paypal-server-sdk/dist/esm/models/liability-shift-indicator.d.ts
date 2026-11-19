import type { EnumSchema } from "../core/validation/schema.js";
/** Liability shift indicator. The outcome of the issuer's authentication. */
export declare const LiabilityShiftIndicator: {
    /** Liability is with the merchant. */
    readonly No: "NO";
    /** Liability may shift to the card issuer. */
    readonly Possible: "POSSIBLE";
    /** The authentication system is not available. */
    readonly Unknown: "UNKNOWN";
};
export type LiabilityShiftIndicator = (typeof LiabilityShiftIndicator)[keyof typeof LiabilityShiftIndicator] | (string & {});
export declare const liabilityShiftIndicatorSchema: EnumSchema<LiabilityShiftIndicator>;
