import * as s from "../core/validation/index.js";
/** Operating System type of the device that the buyer is using. */
export const OsType = {
    /** Google Android OS. */
    Android: "ANDROID",
    /** Apple OS typically found in Apple mobile devices. */
    Ios: "IOS",
    /** Any other OS type. */
    Other: "OTHER",
};
export const osTypeSchema = s.enumOf(OsType);
