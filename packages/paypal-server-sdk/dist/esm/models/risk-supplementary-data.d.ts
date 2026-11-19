import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type ParticipantMetadata } from "./participant-metadata.js";
/** Additional information necessary to evaluate the risk profile of a transaction. */
export type RiskSupplementaryData = {
    /** Profile information of the sender or receiver. */
    customer?: ParticipantMetadata;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const riskSupplementaryDataInternalSchema: Schema<RiskSupplementaryData>;
export declare const riskSupplementaryDataSchema: Schema<RiskSupplementaryData>;
