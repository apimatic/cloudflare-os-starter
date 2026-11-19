import type { JsonValue, Schema } from "../core/validation/schema.js";
import { type SepaDebitRequest } from "./sepa-debit-request.js";
/** A Resource representing a request to vault a Bank used for ACH Debit. */
export type BankRequest = {
    /** A Resource representing a request to vault a ACH Debit. */
    achDebit?: Record<string, unknown>;
    /** An API resource denoting a request to securely store a SEPA Debit. */
    sepaDebit?: SepaDebitRequest;
    /** Properties the service sent or accepts beyond those declared. */
    additionalProperties?: Record<string, JsonValue>;
};
export declare const bankRequestInternalSchema: Schema<BankRequest>;
export declare const bankRequestSchema: Schema<BankRequest>;
