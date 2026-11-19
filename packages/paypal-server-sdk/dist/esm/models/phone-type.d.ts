import type { EnumSchema } from "../core/validation/schema.js";
/** The phone type. */
export declare const PhoneType: {
    /** Fax number. */
    readonly Fax: "FAX";
    /** Home phone number. */
    readonly Home: "HOME";
    /** Mobile phone number. */
    readonly Mobile: "MOBILE";
    /** Other phone number. */
    readonly Other: "OTHER";
    /** Pager number. */
    readonly Pager: "PAGER";
};
export type PhoneType = (typeof PhoneType)[keyof typeof PhoneType] | (string & {});
export declare const phoneTypeSchema: EnumSchema<PhoneType>;
