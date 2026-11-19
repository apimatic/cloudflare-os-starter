import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The name of the party. */
export type Name = {
    /** When the party is a person, the party's given, or first, name. */
    givenName?: string;
    /**
     * When the party is a person, the party's surname or family name. Also known as the last name.
     * Required when the party is a person. Use also to store multiple surnames including the
     * matronymic, or mother's, surname.
     */
    surname?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const nameInternalSchema: Schema<Name>;
export declare const nameSchema: Schema<Name>;
