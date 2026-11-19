import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type CardCustomer } from "./card-customer.js";
import { type CardVerificationSubscriptions } from "./card-verification-subscriptions.js";
import { type VaultInstructionBase } from "./vault-instruction-base.js";
/** Additional attributes associated with the use of this card. */
export type SubscriptionsCardAttributes = {
    /** The details about a customer in PayPal's system of record. */
    customer?: CardCustomer;
    /**
     * Basic vault instruction specification that can be extended by specific payment sources that
     * supports vaulting.
     */
    vault?: VaultInstructionBase;
    /**
     * The API caller can opt in to verify the card through PayPal offered verification services (e.g.
     * Smart Dollar Auth, 3DS).
     */
    verification?: CardVerificationSubscriptions;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const subscriptionsCardAttributesInternalSchema: Schema<SubscriptionsCardAttributes>;
export declare const subscriptionsCardAttributesSchema: Schema<SubscriptionsCardAttributes>;
