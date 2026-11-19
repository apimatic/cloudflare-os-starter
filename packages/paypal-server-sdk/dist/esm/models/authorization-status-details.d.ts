import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type AuthorizationIncompleteReason } from "./authorization-incomplete-reason.js";
/** The details of the authorized payment status. */
export type AuthorizationStatusDetails = {
    /** The reason why the authorized status is `PENDING`. */
    reason?: AuthorizationIncompleteReason;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const authorizationStatusDetailsSchema: Schema<AuthorizationStatusDetails>;
