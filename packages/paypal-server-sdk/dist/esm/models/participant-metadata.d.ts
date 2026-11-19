import type { JsonValue, Schema } from "../core/validation/schema.js";
/** Profile information of the sender or receiver. */
export type ParticipantMetadata = {
    /**
     * An Internet Protocol address (IP address). This address assigns a numerical label to each
     * device that is connected to a computer network through the Internet Protocol. Supports IPv4 and
     * IPv6 addresses.
     */
    ipAddress?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const participantMetadataInternalSchema: Schema<ParticipantMetadata>;
export declare const participantMetadataSchema: Schema<ParticipantMetadata>;
