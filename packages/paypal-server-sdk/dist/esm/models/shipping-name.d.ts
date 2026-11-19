import type { JsonValue, Schema } from "../core/validation/schema.js";
/** The name of the party. */
export type ShippingName = {
    /** When the party is a person, the party's full name. */
    fullName?: string;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const shippingNameInternalSchema: Schema<ShippingName>;
export declare const shippingNameSchema: Schema<ShippingName>;
