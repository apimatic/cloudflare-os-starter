import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The name of the party. */
export type SubscriptionPayerName = {
    /** The prefix, or title, to the party's name. */
    prefix?: string;
    /** When the party is a person, the party's given, or first, name. */
    givenName?: string;
    /**
     * When the party is a person, the party's surname or family name. Also known as the last name.
     * Required when the party is a person. Use also to store multiple surnames including the
     * matronymic, or mother's, surname.
     */
    surname?: string;
    /**
     * When the party is a person, the party's middle name. Use also to store multiple middle names
     * including the patronymic, or father's, middle name.
     */
    middleName?: string;
    /** The suffix for the party's name. */
    suffix?: string;
    /** When the party is a person, the party's full name. */
    fullName?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionPayerNameInternalSchema: Schema<SubscriptionPayerName>;
export declare const subscriptionPayerNameSchema: Schema<SubscriptionPayerName>;
