import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CaptureIncompleteReason } from "./capture-incomplete-reason.js";
/** The details of the captured payment status. */
export type CaptureStatusDetails = {
    /** The reason why the captured payment status is `PENDING` or `DENIED`. */
    reason?: CaptureIncompleteReason;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const captureStatusDetailsSchema: Schema<CaptureStatusDetails>;
