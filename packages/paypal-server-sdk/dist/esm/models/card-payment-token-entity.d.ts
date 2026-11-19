import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type BinDetails } from "./bin-details.js";
import { type CardAuthenticationResponse } from "./card-authentication-response.js";
import { type CardBrand } from "./card-brand.js";
import { type CardResponseAddress } from "./card-response-address.js";
import { type CardType } from "./card-type.js";
import { type CardVerificationDetails } from "./card-verification-details.js";
import { type CardVerificationStatus } from "./card-verification-status.js";
import { type NetworkTransactionReferenceEntity } from "./network-transaction-reference-entity.js";
/** Full representation of a Card Payment Token. */
export type CardPaymentTokenEntity = {
    /** The card holder's name as it appears on the card. */
    name?: string;
    /** The last digits of the payment card. */
    lastDigits?: string;
    /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
    brand?: CardBrand;
    /**
     * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
     * format](https://tools.ietf.org/html/rfc3339#section-5.6).
     */
    expiry?: string;
    /** Address request details. */
    billingAddress?: CardResponseAddress;
    /** Verification status of Card. */
    verificationStatus?: CardVerificationStatus;
    /** Card Verification details including the authorization details and 3D SECURE details. */
    verification?: CardVerificationDetails;
    /** Previous network transaction reference including id in response. */
    networkTransactionReference?: NetworkTransactionReferenceEntity;
    /** Results of Authentication such as 3D Secure. */
    authenticationResult?: CardAuthenticationResponse;
    /** Bank Identification Number (BIN) details used to fund a payment. */
    binDetails?: BinDetails;
    /** Type of card. i.e Credit, Debit and so on. */
    type?: CardType;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const cardPaymentTokenEntityInternalSchema: Schema<CardPaymentTokenEntity>;
export declare const cardPaymentTokenEntitySchema: Schema<CardPaymentTokenEntity>;
