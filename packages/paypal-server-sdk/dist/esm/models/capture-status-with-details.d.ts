import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CaptureStatusDetails } from "./capture-status-details.js";
import { type CaptureStatus } from "./capture-status.js";
/** The status and status details of a captured payment. */
export type CaptureStatusWithDetails = {
    /** The status of the captured payment. */
    status?: CaptureStatus;
    /** The details of the captured payment status. */
    statusDetails?: CaptureStatusDetails;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const captureStatusWithDetailsSchema: Schema<CaptureStatusWithDetails>;
