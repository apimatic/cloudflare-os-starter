import type { EnumSchema } from "../core/validation/schema.js";
/** The type of capture. */
export declare const CaptureType: {
    /** The outstanding balance that the subscriber must clear. */
    readonly OutstandingBalance: "OUTSTANDING_BALANCE";
};
export type CaptureType = (typeof CaptureType)[keyof typeof CaptureType] | (string & {});
export declare const captureTypeSchema: EnumSchema<CaptureType>;
