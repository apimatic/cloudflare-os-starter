import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AuthorizationStatusDetails } from "./authorization-status-details.js";
import { type AuthorizationStatus } from "./authorization-status.js";
/** The status fields and status details for an authorized payment. */
export type AuthorizationStatusWithDetails = {
    /** The status for the authorized payment. */
    status?: AuthorizationStatus;
    /** The details of the authorized payment status. */
    statusDetails?: AuthorizationStatusDetails;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const authorizationStatusWithDetailsSchema: Schema<AuthorizationStatusWithDetails>;
