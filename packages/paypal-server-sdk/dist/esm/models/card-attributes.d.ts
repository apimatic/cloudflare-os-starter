import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CardCustomerInformation } from "./card-customer-information.js";
import { type CardVerification } from "./card-verification.js";
import { type VaultInstructionBase } from "./vault-instruction-base.js";
/** Additional attributes associated with the use of this card. */
export type CardAttributes = {
    /** The details about a customer in PayPal's system of record. */
    customer?: CardCustomerInformation;
    /**
     * Basic vault instruction specification that can be extended by specific payment sources that
     * supports vaulting.
     */
    vault?: VaultInstructionBase;
    /**
     * The API caller can opt in to verify the card through PayPal offered verification services (e.g.
     * Smart Dollar Auth, 3DS).
     */
    verification?: CardVerification;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardAttributesInternalSchema: Schema<CardAttributes>;
export declare const cardAttributesSchema: Schema<CardAttributes>;
