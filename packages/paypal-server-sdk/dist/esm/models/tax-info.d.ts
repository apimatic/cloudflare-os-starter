import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type TaxIdType } from "./tax-id-type.js";
/**
 * The tax ID of the customer. The customer is also known as the payer. Both `tax_id` and
 * `tax_id_type` are required.
 */
export type TaxInfo = {
    /** The customer's tax ID value. */
    taxId: string;
    /** The customer's tax ID type. */
    taxIdType: TaxIdType;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const taxInfoInternalSchema: Schema<TaxInfo>;
export declare const taxInfoSchema: Schema<TaxInfo>;
