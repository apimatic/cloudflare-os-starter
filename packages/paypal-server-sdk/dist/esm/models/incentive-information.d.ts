import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type IncentiveDetails } from "./incentive-details.js";
/** The incentive details. */
export type IncentiveInformation = {
    /** An array of incentive details. */
    incentiveDetails?: IncentiveDetails[];
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const incentiveInformationInternalSchema: Schema<IncentiveInformation>;
export declare const incentiveInformationSchema: Schema<IncentiveInformation>;
