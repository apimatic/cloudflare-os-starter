import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type UpcType } from "./upc-type.js";
/** The Universal Product Code of the item. */
export type UniversalProductCode = {
    /** The Universal Product Code type. */
    type: UpcType;
    /** The UPC product code of the item. */
    code: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const universalProductCodeInternalSchema: Schema<UniversalProductCode>;
export declare const universalProductCodeSchema: Schema<UniversalProductCode>;
