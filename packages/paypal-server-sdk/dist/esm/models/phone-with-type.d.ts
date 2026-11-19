import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PhoneNumber } from "./phone-number.js";
import { type PhoneType } from "./phone-type.js";
/** The phone information. */
export type PhoneWithType = {
    /** The phone type. */
    phoneType?: PhoneType;
    /**
     * The phone number in its canonical international [E.164 numbering plan
     * format](https://www.itu.int/rec/T-REC-E.164/en).
     */
    phoneNumber: PhoneNumber;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const phoneWithTypeInternalSchema: Schema<PhoneWithType>;
export declare const phoneWithTypeSchema: Schema<PhoneWithType>;
