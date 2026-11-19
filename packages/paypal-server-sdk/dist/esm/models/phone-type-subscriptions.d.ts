import type { EnumSchema } from "../core/validation/schema.js";
/** The phone type. */
export declare const PhoneTypeSubscriptions: {
    readonly Fax: "FAX";
    readonly Home: "HOME";
    readonly Mobile: "MOBILE";
    readonly Other: "OTHER";
    readonly Pager: "PAGER";
};
export type PhoneTypeSubscriptions = (typeof PhoneTypeSubscriptions)[keyof typeof PhoneTypeSubscriptions] | (string & {});
export declare const phoneTypeSubscriptionsSchema: EnumSchema<PhoneTypeSubscriptions>;
