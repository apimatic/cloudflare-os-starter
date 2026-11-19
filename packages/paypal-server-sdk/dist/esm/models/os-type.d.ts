import type { EnumSchema } from "../core/validation/schema.js";
/** Operating System type of the device that the buyer is using. */
export declare const OsType: {
    /** Google Android OS. */
    readonly Android: "ANDROID";
    /** Apple OS typically found in Apple mobile devices. */
    readonly Ios: "IOS";
    /** Any other OS type. */
    readonly Other: "OTHER";
};
export type OsType = (typeof OsType)[keyof typeof OsType] | (string & {});
export declare const osTypeSchema: EnumSchema<OsType>;
