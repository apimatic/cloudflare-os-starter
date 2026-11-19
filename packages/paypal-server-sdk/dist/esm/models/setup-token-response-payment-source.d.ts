import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type PayPalPaymentToken } from "./pay-pal-payment-token.js";
import { type SetupTokenResponseCard } from "./setup-token-response-card.js";
import { type VenmoPaymentToken } from "./venmo-payment-token.js";
/** The setup payment method details. */
export type SetupTokenResponsePaymentSource = {
    card?: SetupTokenResponseCard;
    /** Full representation of a PayPal Payment Token. */
    paypal?: PayPalPaymentToken;
    /** Full representation of a Venmo Payment Token. */
    venmo?: VenmoPaymentToken;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const setupTokenResponsePaymentSourceInternalSchema: Schema<SetupTokenResponsePaymentSource>;
export declare const setupTokenResponsePaymentSourceSchema: Schema<SetupTokenResponsePaymentSource>;
