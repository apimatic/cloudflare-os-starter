import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PhoneNumberSubscriptions } from "./phone-number-subscriptions.js";
import { type PhoneTypeSubscriptions } from "./phone-type-subscriptions.js";
/** The phone information. */
export type PhoneWithTypeSubscriptions = {
    /** The phone type. */
    phoneType?: PhoneTypeSubscriptions;
    /**
     * The phone number, in its canonical international [E.164 numbering plan
     * format](https://www.itu.int/rec/T-REC-E.164/en).
     */
    phoneNumber: PhoneNumberSubscriptions;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const phoneWithTypeSubscriptionsInternalSchema: Schema<PhoneWithTypeSubscriptions>;
export declare const phoneWithTypeSubscriptionsSchema: Schema<PhoneWithTypeSubscriptions>;
