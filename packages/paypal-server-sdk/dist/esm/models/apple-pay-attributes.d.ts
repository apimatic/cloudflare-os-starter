import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CustomerInformation } from "./customer-information.js";
import { type VaultInstruction } from "./vault-instruction.js";
/** Additional attributes associated with apple pay. */
export type ApplePayAttributes = {
    /**
     * This object represents a merchant’s customer, allowing them to store contact details, and track
     * all payments associated with the same customer.
     */
    customer?: CustomerInformation;
    /**
     * Base vaulting specification. The object can be extended for specific use cases within each
     * payment_source that supports vaulting.
     */
    vault?: VaultInstruction;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const applePayAttributesInternalSchema: Schema<ApplePayAttributes>;
export declare const applePayAttributesSchema: Schema<ApplePayAttributes>;
