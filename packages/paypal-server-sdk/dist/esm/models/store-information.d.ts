import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The store information. */
export type StoreInformation = {
    /** The ID of a store for a merchant in the system of record. */
    storeId?: string;
    /** The terminal ID for the checkout stand in a merchant store. */
    terminalId?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const storeInformationInternalSchema: Schema<StoreInformation>;
export declare const storeInformationSchema: Schema<StoreInformation>;
