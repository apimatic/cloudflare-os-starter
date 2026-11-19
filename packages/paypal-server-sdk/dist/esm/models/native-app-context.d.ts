import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type OsType } from "./os-type.js";
/** Merchant provided, buyer's native app preferences to app switch to the PayPal consumer app. */
export type NativeAppContext = {
    /** Operating System type of the device that the buyer is using. */
    osType?: OsType;
    /** Operating System version of the device that the buyer is using. */
    osVersion?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const nativeAppContextInternalSchema: Schema<NativeAppContext>;
export declare const nativeAppContextSchema: Schema<NativeAppContext>;
